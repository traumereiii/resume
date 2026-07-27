/* =========================================================
   화면 렌더링 · 상호작용
   data.js의 데이터를 마크업으로 그리고, 다음 동작을 담당합니다.
     · 상세 영역 탭 (data.js의 TABS 구성 기준)
     · 프로젝트 카드 접기/펼치기
     · 기술 스택 카테고리 필터
     · 스크롤 등장 애니메이션
   탭 마크업([data-tabs])이 없는 페이지에서는 탭 관련 처리를 건너뜁니다.
   ========================================================= */

(() => {
  'use strict';

  /** HTML 문자열에 값을 넣기 전 이스케이프합니다. */
  const esc = (value) =>
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const tagsHtml = (stack) =>
    (stack || []).map((tag) => `<span class="tag">${esc(tag)}</span>`).join('');

  /* ---------- 프로젝트 카드 ---------- */

  /** 외부 링크는 값이 있을 때만 그립니다. 배경색에 따라 링크 클래스를 달리 씁니다. */
  const linkAnchorsHtml = (project, className) =>
    [
      project.repo && { href: project.repo, label: 'GitHub 레포' },
      project.live && { href: project.live, label: 'Live 보기' }
    ]
      .filter(Boolean)
      .map((link) => `
        <a class="${className}" href="${esc(link.href)}" target="_blank" rel="noopener">
          ${esc(link.label)} <span aria-hidden="true">↗</span>
        </a>`)
      .join('');

  const linksHtml = (project) => {
    const anchors = linkAnchorsHtml(project, 'project__link');
    return anchors ? `<div class="project__links">${anchors}</div>` : '';
  };

  /** 프로젝트 하나 = 제목 줄(버튼) + 접히는 본문 한 쌍입니다. */
  const projectHtml = (project, id, isOpen) => `
    <li class="project${isOpen ? ' is-open' : ''}">
      <h3 class="project__title">
        <button type="button" class="project__toggle" aria-expanded="${isOpen}" aria-controls="${id}">
          <span class="project__label">
            <span class="project__period">${esc(project.period)}</span>
            <span class="project__name">${esc(project.title)}</span>
          </span>
          <span class="project__chevron" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="project__body" id="${id}">
        <div class="project__inner">
          <p class="project__summary">${esc(project.summary)}</p>
          <ul class="project__results">
            ${project.results.map((result) => `<li>${esc(result)}</li>`).join('')}
          </ul>
          ${linksHtml(project)}
          ${project.stack.length ? `<div class="project__tags">${tagsHtml(project.stack)}</div>` : ''}
        </div>
      </div>
    </li>`;

  // 초기 펼침 상태 — data.js의 CONFIG.projectsOpenOnLoad를 따릅니다.
  const openOnLoad = CONFIG.projectsOpenOnLoad || 'first';
  const isOpenOnLoad = (index) =>
    openOnLoad === 'all' || (openOnLoad === 'first' && index === 0);

  /** 프로젝트 묶음 = 개수·전체 토글 줄 + 카드 목록. 경력 안에서도, 탭 패널에서도 씁니다. */
  const projectGroupHtml = (projects, idPrefix) => `
    <div class="projects-group">
      <div class="projects__bar">
        <span class="projects__count">프로젝트 ${projects.length}</span>
        <button type="button" class="projects__toggle-all" data-toggle-all>모두 펼치기</button>
      </div>
      <ul class="projects">
        ${projects.map((project, i) =>
          projectHtml(project, `${idPrefix}-${i}`, isOpenOnLoad(i))).join('')}
      </ul>
    </div>`;

  /** 프로젝트 하나의 펼침 상태를 지정합니다. */
  const setProjectOpen = (projectEl, open) => {
    projectEl.classList.toggle('is-open', open);
    $('.project__toggle', projectEl).setAttribute('aria-expanded', String(open));
  };

  /** '모두 펼치기 / 모두 접기' 버튼 문구를 현재 상태에 맞춥니다. */
  const syncToggleAll = (groupEl) => {
    const button = $('[data-toggle-all]', groupEl);
    if (!button) return;

    const allOpen = $$('.project', groupEl).every((project) => project.classList.contains('is-open'));

    button.textContent = allOpen ? '모두 접기' : '모두 펼치기';
    button.setAttribute('aria-expanded', String(allOpen));
  };

  const syncAllGroups = () => $$('.projects-group').forEach(syncToggleAll);

  // 묶음이 어디에 있든(경력 · 프로젝트 탭) 한 곳에서 위임 처리합니다.
  document.addEventListener('click', (e) => {
    const groupEl = e.target.closest('.projects-group');
    if (!groupEl) return;

    const toggle = e.target.closest('.project__toggle');
    if (toggle) {
      const projectEl = toggle.closest('.project');
      setProjectOpen(projectEl, !projectEl.classList.contains('is-open'));
      syncToggleAll(groupEl);
      return;
    }

    if (e.target.closest('[data-toggle-all]')) {
      const projects = $$('.project', groupEl);
      // 하나라도 접혀 있으면 전부 펼치고, 전부 펼쳐져 있으면 전부 접습니다.
      const open = !projects.every((project) => project.classList.contains('is-open'));
      projects.forEach((project) => setProjectOpen(project, open));
      syncToggleAll(groupEl);
    }
  });

  // 인쇄(PDF 저장) 시에는 접힌 내용도 모두 나와야 합니다.
  window.addEventListener('beforeprint', () => {
    $$('.project').forEach((project) => setProjectOpen(project, true));
    syncAllGroups();
  });

  /* ---------- 상세 영역 탭 ----------
     TABS 구성대로 탭 버튼과 빈 패널을 먼저 만들어 둡니다.
     패널 속 내용은 아래 렌더링 코드가 이어서 채웁니다. */

  // content 값 → 패널에 들어갈 컨테이너
  const PANEL_CONTENT = {
    jobs:         '<div class="jobs" data-list="jobs"></div>',
    projects:     '<div data-list="projects"></div>',
    sideProjects: '<div data-list="side-projects"></div>',
    skills:       '<div class="skills" data-list="skills"></div>',
    education:    '<div class="records" data-list="education"></div>'
  };

  const tabsEl = $('[data-tabs]');

  // 꺼진 탭과 내용 종류를 알 수 없는 탭은 빼고 그립니다.
  const tabs = (tabsEl && typeof TABS !== 'undefined' ? TABS : [])
    .filter((tab) => tab.enabled !== false && PANEL_CONTENT[tab.content]);

  if (tabsEl) {
    $('[data-list="tabs"]', tabsEl).innerHTML = tabs.map((tab) => `
      <button type="button" class="tab" role="tab"
              id="tab-${esc(tab.id)}" aria-controls="${esc(tab.id)}"
              aria-selected="false" tabindex="-1" data-tab="${esc(tab.id)}">${esc(tab.label)}</button>
    `).join('');

    $('[data-list="panels"]', tabsEl).innerHTML = tabs.map((tab) => `
      <div class="tabpanel" role="tabpanel" id="${esc(tab.id)}"
           aria-labelledby="tab-${esc(tab.id)}" data-panel="${esc(tab.id)}" tabindex="0" hidden>
        <!-- 화면에서는 탭 이름이 제목 역할을 하므로 숨기고, 인쇄할 때만 드러냅니다. -->
        <h2 class="tabpanel__title">${esc(tab.label)}</h2>
        ${PANEL_CONTENT[tab.content]}
      </div>
    `).join('');
  }

  /* ---------- 경력 (회사별 프로젝트 포함) ---------- */

  const jobsEl = $('[data-list="jobs"]');

  if (jobsEl) {
    jobsEl.innerHTML = JOBS.map((job, jobIndex) => {
      // 같은 회사에서 진행한 프로젝트를 경력 항목 아래에 붙입니다.
      const projects = WORK_PROJECTS.filter((project) => project.company === job.company);

      return `
      <article class="job">
        <div class="job__period">${esc(job.period)}</div>
        <div class="job__body">
          <div class="job__company">${esc(job.company)}</div>
          <div class="job__role">${esc(job.role)}</div>
          ${projects.length ? projectGroupHtml(projects, `job-${jobIndex}`) : ''}
        </div>
      </article>
    `;
    }).join('');
  }

  /* ---------- 프로젝트 · 개인 프로젝트 탭 ---------- */

  const renderProjectList = (selector, items, idPrefix) => {
    const el = $(selector);
    if (!el) return;

    el.innerHTML = items && items.length
      ? projectGroupHtml(items, idPrefix)
      : '<p class="empty">등록된 프로젝트가 없습니다.</p>';
  };

  renderProjectList('[data-list="projects"]', typeof PROJECTS !== 'undefined' ? PROJECTS : [], 'project');

  syncAllGroups();

  /* ---------- 개인 프로젝트 (카드 + 상세 모달) ---------- */

  const sideEl = $('[data-list="side-projects"]');
  const sideProjects = typeof SIDE_PROJECTS !== 'undefined' ? SIDE_PROJECTS : [];

  /** 경로가 있는 스크린샷만 추립니다. */
  const shotsOf = (project) => (project.shots || []).filter((shot) => shot && shot.src);

  const cardHtml = (project, index) => {
    const shots = shotsOf(project);
    const thumb = project.thumb || (shots[0] && shots[0].src) || '';

    return `
    <li class="card">
      <button type="button" class="card__button" data-open-project="${index}">
        <span class="card__thumb">
          ${thumb
            ? `<img src="${esc(thumb)}" alt="" loading="lazy">`
            : `<span class="card__thumb-empty" aria-hidden="true">${esc(project.title.slice(0, 1))}</span>`}
        </span>
        <span class="card__body">
          <span class="card__period">${esc(project.period)}</span>
          <span class="card__title">${esc(project.title)}</span>
          <span class="card__summary">${esc(project.summary)}</span>
          ${project.stack.length ? `<span class="card__tags">${tagsHtml(project.stack.slice(0, 4))}</span>` : ''}
        </span>
        <span class="card__more">자세히 보기 <span aria-hidden="true">→</span></span>
      </button>
    </li>`;
  };

  // 모달은 개인 프로젝트가 있을 때 한 번만 만들어 두고 내용만 갈아 끼웁니다.
  let modalEl = null;
  let modalShots = [];
  let shotIndex = 0;

  /** 스크린샷 n번째를 보여줍니다. 범위를 벗어나면 처음/끝으로 돌아갑니다. */
  const setShot = (index) => {
    if (!modalShots.length) return;

    shotIndex = (index + modalShots.length) % modalShots.length;
    const shot = modalShots[shotIndex];
    const frame = $('.shots__frame', modalEl);
    const img = $('[data-shot-img]', modalEl);

    frame.classList.remove('is-broken');
    img.src = shot.src;
    img.alt = shot.alt || '';

    $('[data-shot-counter]', modalEl).textContent = `${shotIndex + 1} / ${modalShots.length}`;
    $$('[data-shot-go]', modalEl).forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === shotIndex));
    });
  };

  const buildModal = () => {
    modalEl = document.createElement('dialog');
    modalEl.className = 'modal';
    modalEl.setAttribute('aria-labelledby', 'modal-title');
    modalEl.innerHTML = `
      <div class="modal__inner">
        <button type="button" class="modal__close" data-close-modal aria-label="닫기">✕</button>

        <div class="shots" data-shots hidden>
          <div class="shots__frame">
            <img class="shots__img" data-shot-img alt="">
            <button type="button" class="shots__nav shots__nav--prev" data-shot-step="-1" aria-label="이전 스크린샷">‹</button>
            <button type="button" class="shots__nav shots__nav--next" data-shot-step="1" aria-label="다음 스크린샷">›</button>
          </div>
          <div class="shots__bar">
            <div class="shots__dots" data-shot-dots></div>
            <span class="shots__counter" data-shot-counter></span>
          </div>
        </div>

        <div class="modal__body">
          <p class="modal__period" data-modal-period></p>
          <h2 class="modal__title" id="modal-title" data-modal-title></h2>
          <p class="modal__desc" data-modal-desc></p>
          <ul class="modal__results" data-modal-results></ul>
          <div class="modal__tags" data-modal-tags></div>
          <div class="modal__links" data-modal-links></div>
        </div>
      </div>`;

    document.body.appendChild(modalEl);

    modalEl.addEventListener('click', (e) => {
      if (e.target.closest('[data-close-modal]')) { modalEl.close(); return; }

      const step = e.target.closest('[data-shot-step]');
      if (step) { setShot(shotIndex + Number(step.dataset.shotStep)); return; }

      const dot = e.target.closest('[data-shot-go]');
      if (dot) { setShot(Number(dot.dataset.shotGo)); return; }

      // 바깥 여백(백드롭)을 누르면 닫습니다. Esc는 dialog가 알아서 처리합니다.
      if (e.target === modalEl) modalEl.close();
    });

    modalEl.addEventListener('keydown', (e) => {
      if (modalShots.length < 2) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); setShot(shotIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setShot(shotIndex + 1); }
    });

    modalEl.addEventListener('close', () => {
      document.body.classList.remove('is-locked');
    });
  };

  const openProject = (index) => {
    const project = sideProjects[index];
    if (!project) return;

    if (!modalEl) buildModal();

    $('[data-modal-period]', modalEl).textContent = project.period;
    $('[data-modal-title]', modalEl).textContent = project.title;

    const descEl = $('[data-modal-desc]', modalEl);
    descEl.textContent = project.description || project.summary || '';
    descEl.hidden = !descEl.textContent;

    const resultsEl = $('[data-modal-results]', modalEl);
    resultsEl.innerHTML = (project.results || []).map((result) => `<li>${esc(result)}</li>`).join('');
    resultsEl.hidden = !(project.results || []).length;

    const tagsEl = $('[data-modal-tags]', modalEl);
    tagsEl.innerHTML = tagsHtml(project.stack);
    tagsEl.hidden = !(project.stack || []).length;

    const linksEl = $('[data-modal-links]', modalEl);
    linksEl.innerHTML = linkAnchorsHtml(project, 'modal__link');
    linksEl.hidden = !linksEl.innerHTML.trim();

    // 스크린샷 — 한 장이면 넘김 버튼과 점을 감춥니다.
    modalShots = shotsOf(project);
    const shotsEl = $('[data-shots]', modalEl);
    shotsEl.hidden = !modalShots.length;
    shotsEl.classList.toggle('is-single', modalShots.length < 2);
    modalEl.classList.toggle('has-shots', modalShots.length > 0);

    if (modalShots.length) {
      $('[data-shot-dots]', modalEl).innerHTML = modalShots.map((_, i) => `
        <button type="button" class="shots__dot" data-shot-go="${i}"
                aria-label="${i + 1}번째 스크린샷" aria-current="false"></button>
      `).join('');
      setShot(0);
    }

    document.body.classList.add('is-locked');
    modalEl.showModal();
  };

  if (sideEl) {
    sideEl.innerHTML = sideProjects.length
      ? `<ul class="cards">${sideProjects.map(cardHtml).join('')}</ul>`
      : '<p class="empty">등록된 프로젝트가 없습니다.</p>';

    sideEl.addEventListener('click', (e) => {
      const button = e.target.closest('[data-open-project]');
      if (button) openProject(Number(button.dataset.openProject));
    });
  }

  // 이미지 경로가 잘못됐을 때 깨진 아이콘 대신 빈 자리를 보여줍니다.
  // (error 이벤트는 버블링하지 않아 캡처 단계에서 받습니다.)
  document.addEventListener('error', (e) => {
    const target = e.target;
    if (target.tagName !== 'IMG') return;

    const holder = target.closest('.card__thumb, .shots__frame');
    if (holder) holder.classList.add('is-broken');
  }, true);

  /* ---------- 학력 · 자격증 ---------- */

  const educationEl = $('[data-list="education"]');

  if (educationEl) {
    /** 기간 + 이름 + 부가 설명 한 줄짜리 항목입니다. */
    const recordHtml = (period, name, sub) => `
      <li class="record">
        <span class="record__period">${esc(period)}</span>
        <span class="record__body">
          <span class="record__name">${esc(name)}</span>
          ${sub ? `<span class="record__sub">${esc(sub)}</span>` : ''}
        </span>
      </li>`;

    const groupHtml = (title, items) => items.length ? `
      <section class="records__group">
        <h3 class="records__title">${esc(title)}</h3>
        <ul class="records__list">${items.join('')}</ul>
      </section>` : '';

    const education = (typeof EDUCATION !== 'undefined' ? EDUCATION : []).map((item) =>
      // '전공 · 졸업' 형태로 붙이되, 한쪽이 비면 남은 값만 씁니다.
      recordHtml(item.period, item.school, [item.major, item.note].filter(Boolean).join(' · ')));

    const certificates = (typeof CERTIFICATES !== 'undefined' ? CERTIFICATES : []).map((item) =>
      recordHtml(item.date, item.name, item.issuer));

    educationEl.innerHTML =
      groupHtml('학력', education) + groupHtml('자격증', certificates)
      || '<p class="empty">등록된 내용이 없습니다.</p>';
  }

  /* ---------- 기술 스택 ---------- */

  const chipsEl = $('[data-list="categories"]');
  const skillsEl = $('[data-list="skills"]');
  let activeCat = 'all';

  if (chipsEl) {
    chipsEl.innerHTML = CATEGORIES.map((cat) => `
      <button type="button" class="chip" data-cat="${esc(cat.id)}" aria-pressed="false">${esc(cat.label)}</button>
    `).join('');

    chipsEl.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      activeCat = chip.dataset.cat;
      renderSkills();
    });
  }

  function renderSkills() {
    if (!skillsEl) return;

    const visible = SKILLS.filter((skill) => activeCat === 'all' || skill.cat === activeCat);

    skillsEl.innerHTML = visible.map((skill) => `
      <div class="skill">
        <div class="skill__head">
          <span class="skill__name">${esc(skill.name)}</span>
          <span class="skill__note">${esc(skill.note)}</span>
        </div>
        ${CONFIG.showSkillBars ? `
          <div class="skill__track">
            <div class="skill__bar" data-pct="${skill.pct}"></div>
          </div>` : ''}
      </div>
    `).join('');

    // 0에서 목표 값으로 늘어나도록 다음 프레임에 폭을 지정합니다.
    requestAnimationFrame(() => {
      $$('.skill__bar', skillsEl).forEach((bar) => {
        bar.style.width = bar.dataset.pct + '%';
      });
    });

    if (chipsEl) {
      $$('.chip', chipsEl).forEach((chip) => {
        chip.setAttribute('aria-pressed', String(chip.dataset.cat === activeCat));
      });
    }
  }

  renderSkills();

  /* ---------- 탭 전환 ---------- */

  if (tabsEl && tabs.length) {
    const tabButtons = $$('[data-tab]', tabsEl);
    const panels = $$('[data-panel]', tabsEl);
    const extras = $$('[data-tab-extra]', tabsEl);

    /** 탭 하나를 활성화하고 나머지를 접습니다. */
    const activate = (id, focusTab = false) => {
      const tab = tabs.find((item) => item.id === id);
      if (!tab) return;

      tabButtons.forEach((button) => {
        const on = button.dataset.tab === id;
        button.setAttribute('aria-selected', String(on));
        button.tabIndex = on ? 0 : -1;
        if (on && focusTab) button.focus();
      });

      panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== id; });

      // 보조 영역(기술 스택의 카테고리 필터 등)은 content 값으로 짝을 맞춥니다.
      extras.forEach((extra) => { extra.hidden = extra.dataset.tabExtra !== tab.content; });

      // 프로젝트 카드는 파란 배경용, 숙련도 막대는 밝은 배경용 스타일입니다.
      tabsEl.classList.toggle('is-blue', tab.theme !== 'cream');

      // 숨겨진 동안에는 막대가 늘어나는 모습을 볼 수 없으니 다시 그립니다.
      if (tab.content === 'skills') renderSkills();
    };

    tabsEl.addEventListener('click', (e) => {
      const button = e.target.closest('[data-tab]');
      if (button) activate(button.dataset.tab, true);
    });

    // ←→↑↓ · Home · End 로 탭을 이동합니다. (세로/가로 배치 모두 대응)
    const steps = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };

    $('.tablist', tabsEl).addEventListener('keydown', (e) => {
      const current = tabButtons.findIndex((button) => button.tabIndex === 0);
      let next;

      if (e.key in steps) next = current + steps[e.key];
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabButtons.length - 1;
      else return;

      e.preventDefault();
      next = (next + tabButtons.length) % tabButtons.length;
      activate(tabButtons[next].dataset.tab, true);
    });

    // #skills 같은 해시로 들어오면 해당 탭을 엽니다.
    const openFromHash = () => {
      const id = location.hash.slice(1);
      if (tabs.some((tab) => tab.id === id)) activate(id);
    };

    const initial = tabs.find((tab) => tab.id === CONFIG.defaultTab) || tabs[0];
    activate(initial.id);
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
  }

  /* ---------- 스크롤 등장 애니메이션 ---------- */

  const revealTargets = $$('[data-reveal]');
  const showAll = () => revealTargets.forEach((node) => node.classList.add('is-visible'));

  if (!CONFIG.revealOnScroll || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((node) => observer.observe(node));
  }
})();
