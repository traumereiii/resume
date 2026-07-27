# 서동성 · 개발자 프로필 사이트

[Claude Design 프로젝트](https://claude.ai/design/p/b53f7f4e-b0ff-4348-9262-0a2fc0bfb642)의
`개발자 프로필.dc.html`(Design Canvas)을 빌드 도구 없이 동작하는 정적 사이트로 옮긴 결과물입니다.

내용은 이력서 원문 `RESUME.md` 기준이며, GitHub Pages로 배포되어 있습니다.
(`RESUME.md`는 개인정보가 들어 있어 저장소에 올리지 않고 로컬에만 둡니다.)
👉 https://traumereiii.github.io/resume/

## 실행

빌드 과정이 없습니다. `index.html`을 브라우저로 열면 바로 확인할 수 있고,
로컬 서버로 띄우려면 아래 중 하나를 쓰면 됩니다.

```bash
python -m http.server 8000
# 또는
npx serve .
```

## 구조

```
index.html            화면 뼈대 (헤더는 정적, 상세 영역은 데이터로 렌더링)
index-bak.html        탭 도입 이전의 단일 페이지 버전 (백업)
css/style.css         전체 스타일 · 반응형 · 인쇄
js/data.js            프로필 데이터 (이 파일만 고치면 내용이 바뀝니다)
js/app.js             탭 · 접기/펼치기 · 필터 · 모달 · 스크롤 애니메이션
images/profile.jpg    프로필 사진
images/projects/      개인 프로젝트 스크린샷
```

헤더(이름·연락처·소개 문단)는 `index.html`에 직접 적혀 있고,
그 아래 상세 영역은 전부 `js/data.js`를 읽어 스크립트가 그립니다.

## 화면 구성

상세 영역은 좌측 세로 탭으로 나뉩니다. 탭 목록과 순서는 `js/data.js`의 `TABS`에서 관리합니다.

```js
const TABS = [
  { id: 'experience', label: '경력', content: 'jobs', theme: 'blue', enabled: true },
  ...
];
```

| 항목 | 설명 |
| --- | --- |
| `id` | 탭 식별자. `#experience`처럼 주소 해시로 바로 열 수 있습니다 |
| `label` | 탭에 표시할 이름 |
| `content` | 패널에 넣을 내용. `jobs` / `projects` / `sideProjects` / `skills` / `education` 중 하나 |
| `theme` | 패널 배색. `blue`(파란 배경) 또는 `cream`(밝은 배경) |
| `enabled` | `false`로 두면 탭과 내용이 함께 빠집니다 |

배열 순서가 곧 탭 순서입니다. 탭은 클릭뿐 아니라 방향키·`Home`·`End`로도 이동합니다.

`theme`을 나눠 둔 이유는 경력·프로젝트 카드가 파란 배경용, 숙련도 막대와 개인 프로젝트
카드가 밝은 배경용 스타일이기 때문입니다. 활성 탭에 따라 섹션 배색 전체가 바뀝니다.

## 내용 수정

모든 문구와 목록은 `js/data.js` 한 곳에 모여 있습니다.

| 상수 | 내용 |
| --- | --- |
| `CONFIG` | 화면 동작 옵션 (아래 표 참고) |
| `TABS` | 탭 구성 |
| `SKILLS` | 기술 스택 (`cat`은 `CATEGORIES`의 `id`, `pct`가 막대 길이) |
| `CATEGORIES` | 기술 스택 필터 버튼 |
| `JOBS` | 경력 (기간 · 직무 · 회사) |
| `WORK_PROJECTS` | 회사 업무 프로젝트 (`company`가 같은 `JOBS` 항목 아래에 표시됩니다) |
| `PROJECTS` | 대표 프로젝트만 회사 구분 없이 모아 보여주는 탭의 내용 |
| `SIDE_PROJECTS` | 개인 프로젝트 (카드 + 상세 모달) |
| `EDUCATION` | 학력 |
| `CERTIFICATES` | 자격증 |

`CONFIG`에서 조정할 수 있는 항목입니다.

| 옵션 | 값 |
| --- | --- |
| `showSkillBars` | 기술 스택 숙련도 막대 표시 여부 |
| `revealOnScroll` | 스크롤 시 섹션 등장 애니메이션 사용 여부 |
| `projectsOpenOnLoad` | 프로젝트의 초기 펼침 상태. `none`(전부 접음) / `first`(묶음별 첫 항목만) / `all` |
| `defaultTab` | 처음 열려 있을 탭의 `id` |

값이 비면 해당 영역이 통째로 빠집니다. `repo`·`live`가 빈 문자열이면 링크가,
`stack`이 빈 배열이면 기술 태그 줄이 그려지지 않습니다.
(원본 Design Canvas의 `sc-if` 동작과 동일)

숙련도 막대의 `pct`는 객관적 근거가 있는 수치가 아니라 직접 정한 값입니다.
표시하고 싶지 않으면 `CONFIG.showSkillBars`를 `false`로 두면 됩니다.

## 개인 프로젝트 스크린샷

`SIDE_PROJECTS`의 각 항목은 카드로 나열되고, 카드를 누르면 상세 모달이 열립니다.

```js
{
  thumb: '',                                    // 카드 썸네일. 비우면 shots의 첫 장을 씁니다
  shots: [                                      // 모달 스크린샷
    { src: './images/projects/a.png', alt: '설명' }
  ],
  description: '',                              // 모달 상세 설명. 비우면 summary를 씁니다
  results: [], stack: [], repo: '', live: ''
}
```

스크린샷이 두 장 이상이면 좌우 버튼·점·방향키로 넘길 수 있고, 한 장이면 넘김 버튼이 숨습니다.
`shots`를 비우면 스크린샷 영역 자체가 빠집니다. 모달은 `Esc`·바깥 클릭·닫기 버튼으로 닫힙니다.

`images/projects/sample-1~3.svg`는 레이아웃 확인용 예시 이미지입니다.
실제 스크린샷으로 교체한 뒤 지우면 됩니다. 이미지는 잘리지 않고 프레임 안에 맞춰 들어가며
(`object-fit: contain`), 가로형(16:10 안팎)이 프레임에 가장 잘 맞습니다.

## 프로필 사진

`index.html`에 일반 `<img>`로 박혀 있습니다. 방문자 모두에게 같은 이미지가 보이고,
클릭해도 아무 일이 일어나지 않습니다.

```html
<img class="photo__img" src="./images/profile.jpg" alt="서동성 프로필 사진" width="800" height="1067">
```

`images/profile.jpg`는 원본 사진을 프레임 비율(3:4)에 맞춰 상반신으로 자르고
800×1067로 줄인 것입니다. 위치 정보 등 EXIF 메타데이터는 제거했습니다.
사진을 바꿀 때도 3:4로 맞춰 넣으면 잘리는 부분 없이 프레임을 채웁니다.

## 인쇄 · PDF 저장

화면에서 접히거나 숨어 있는 내용도 인쇄할 때는 모두 나옵니다.

- 탭 조작 영역이 빠지고, 모든 탭의 내용이 한 컬럼으로 이어서 출력됩니다
- 접어 둔 프로젝트가 전부 펼쳐집니다
- 화면에서 탭 이름이 대신하던 섹션 제목(`경력`, `기술 스택` …)이 이때 드러납니다

## 캐시

`index.html`에서 css·js를 `?v=` 파라미터와 함께 불러옵니다.

```html
<link rel="stylesheet" href="./css/style.css?v=16">
```

파일을 고쳤는데 브라우저에 반영되지 않으면 이 숫자를 올리면 됩니다.
