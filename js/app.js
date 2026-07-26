/* =========================================================
   화면 렌더링 · 상호작용
   data.js의 데이터를 마크업으로 그리고, 다음 동작을 담당합니다.
     · 스크롤 등장 애니메이션
     · 기술 스택 카테고리 필터
     · 프로젝트 카드 → 상세 모달 (배경/닫기 버튼/ESC로 닫힘)
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

  /* ---------- 기본 텍스트 바인딩 ---------- */

  const availability = $('[data-bind="availability"]');
  if (availability) availability.textContent = CONFIG.availability;

  /* ---------- 경력 ---------- */

  $('[data-list="jobs"]').innerHTML = JOBS.map((job) => `
    <article class="job">
      <div class="job__period">${esc(job.period)}</div>
      <div class="job__body">
        <div>
          <div class="job__role">${esc(job.role)}</div>
          <div class="job__company">${esc(job.company)}</div>
        </div>
        <ul class="job__points">
          ${job.points.map((point) => `<li>${esc(point)}</li>`).join('')}
        </ul>
      </div>
    </article>
  `).join('');

  /* ---------- 기술 스택 ---------- */

  const chipsEl = $('[data-list="categories"]');
  const skillsEl = $('[data-list="skills"]');
  let activeCat = 'all';

  chipsEl.innerHTML = CATEGORIES.map((cat) => `
    <button type="button" class="chip" data-cat="${esc(cat.id)}" aria-pressed="false">${esc(cat.label)}</button>
  `).join('');

  function renderSkills() {
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

    $$('.chip', chipsEl).forEach((chip) => {
      chip.setAttribute('aria-pressed', String(chip.dataset.cat === activeCat));
    });
  }

  chipsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    activeCat = chip.dataset.cat;
    renderSkills();
  });

  renderSkills();

  /* ---------- 프로젝트 카드 ---------- */

  function renderCards(selector, items) {
    const container = $(selector);
    container.innerHTML = items.map((project, index) => `
      <button type="button" class="card" data-index="${index}">
        <span class="card__top">
          <span class="card__year">${esc(project.year)}</span>
          <span class="card__arrow" aria-hidden="true">→</span>
        </span>
        <span class="card__heading">
          <span class="card__title">${esc(project.title)}</span>
          <span class="card__period">${esc(project.period)}</span>
        </span>
        <span class="card__summary">${esc(project.summary)}</span>
        <span class="tags">${tagsHtml(project.stack)}</span>
      </button>
    `).join('');

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (card) openModal(items[Number(card.dataset.index)], card);
    });
  }

  renderCards('[data-list="workProjects"]', WORK_PROJECTS);
  renderCards('[data-list="projects"]', PROJECTS);

  /* ---------- 프로젝트 상세 모달 ---------- */

  const modal = $('#modal');
  const panel = $('.modal__panel', modal);
  let lastFocused = null;

  function openModal(project, trigger) {
    lastFocused = trigger || document.activeElement;

    const hasRepo = Boolean(project.repo);
    const hasLive = Boolean(project.live);
    const hasLinks = hasRepo || hasLive;
    const hasDocs = Boolean(project.docs && project.docs.length);

    panel.innerHTML = `
      <div class="modal__head">
        <div class="block">
          <span class="modal__kicker">${esc(project.period)} · ${esc(project.role)}</span>
          <h3 class="modal__title" id="modal-title">${esc(project.title)}</h3>
        </div>
        <button type="button" class="modal__close" aria-label="닫기">×</button>
      </div>
      <div class="modal__rule" aria-hidden="true"></div>
      <div class="modal__body">
        <div class="modal__shot">
          <image-slot id="${esc(project.slotId)}" shape="rect" placeholder="프로젝트 스크린샷"></image-slot>
        </div>
        ${hasLinks ? `
          <div class="modal__links">
            ${hasRepo ? `<a class="btn btn--solid" href="${esc(project.repo)}" target="_blank" rel="noopener">GitHub 레포 <span class="btn__icon" aria-hidden="true">↗</span></a>` : ''}
            ${hasLive ? `<a class="btn btn--ghost" href="${esc(project.live)}" target="_blank" rel="noopener">Live 보기 <span class="btn__icon" aria-hidden="true">↗</span></a>` : ''}
          </div>` : ''}
        <p class="modal__detail">${esc(project.detail)}</p>
        ${hasDocs ? `
          <div class="block">
            <div class="block__label">문서</div>
            <div class="docs">
              ${project.docs.map((doc) => `
                <a class="doc" href="${esc(doc.href)}">${esc(doc.label)} <span class="doc__icon" aria-hidden="true">→</span></a>
              `).join('')}
            </div>
          </div>` : ''}
        <div class="block">
          <div class="block__label">성과</div>
          <ul class="results">
            ${project.results.map((result) => `<li>${esc(result)}</li>`).join('')}
          </ul>
        </div>
        <div class="modal__tags">${tagsHtml(project.stack)}</div>
      </div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal__close', panel).focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    panel.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  modal.addEventListener('click', (e) => {
    // 배경 클릭 또는 닫기 버튼
    if (e.target === modal || e.target.closest('.modal__close')) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

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
