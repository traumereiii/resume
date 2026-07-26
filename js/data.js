/* =========================================================
   프로필 데이터
   여기만 고치면 화면 전체가 바뀝니다. (마크업 수정 불필요)
   내용은 이력서 원문 `RESUME.md` 기준입니다.
   ========================================================= */

// 화면 동작 옵션 — 원본 Design Canvas의 props에 대응합니다.
const CONFIG = {
  // 숙련도 막대는 객관적 근거가 없어 꺼 두었습니다.
  // 켜려면 true로 바꾸고 아래 SKILLS의 pct 값을 직접 조정하세요.
  showSkillBars: false,
  revealOnScroll: true   // 스크롤 시 섹션 등장 애니메이션
};

// 분류는 이력서의 스킬 구분을 그대로 따릅니다.
const SKILLS = [
  { name: 'Java', cat: 'lang', pct: 90, note: '주력' },
  { name: 'Kotlin', cat: 'lang', pct: 65, note: '' },
  { name: 'JavaScript', cat: 'lang', pct: 85, note: '데이터 수집' },
  { name: 'TypeScript', cat: 'lang', pct: 70, note: '실무 도입' },

  { name: 'Spring Boot', cat: 'backend', pct: 90, note: '주력' },
  { name: 'Spring Framework', cat: 'backend', pct: 85, note: '레거시 운영 · 리팩터링' },
  { name: 'JPA', cat: 'backend', pct: 75, note: '데이터 접근' },
  { name: 'Nest.js', cat: 'backend', pct: 70, note: '실무 도입' },
  { name: 'Node.js', cat: 'backend', pct: 90, note: 'Puppeteer 데이터 수집' },

  { name: 'Vue.js', cat: 'frontend', pct: 60, note: '' },
  { name: 'HTML', cat: 'frontend', pct: 70, note: '' },

  { name: 'Oracle', cat: 'database', pct: 75, note: '' },
  { name: 'MySQL', cat: 'database', pct: 80, note: '' },
  { name: 'Redis', cat: 'database', pct: 70, note: '세션 캐시' },

  { name: 'Microsoft Azure', cat: 'devops', pct: 65, note: '' },
  { name: 'AKS (Kubernetes)', cat: 'devops', pct: 65, note: '배포 환경' },
  { name: 'Prometheus · Grafana · Loki', cat: 'devops', pct: 75, note: '모니터링 · 로그 수집' },
  { name: 'CI/CD', cat: 'devops', pct: 75, note: '무중단 자동 배포' },

  { name: 'Git · GitHub', cat: 'tools', pct: 85, note: '형상 관리' }
];

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'lang', label: '언어' },
  { id: 'backend', label: '백엔드' },
  { id: 'frontend', label: '프론트엔드' },
  { id: 'database', label: '데이터베이스' },
  { id: 'devops', label: 'DevOps · 인프라' },
  { id: 'tools', label: '도구' }
];

const WORK_PROJECTS = [
  {
    slotId: 'work-1',
    year: '2025',
    period: '2025.09 – 2025.12 · 4개월',
    title: '주성엔지니어링 업무관리시스템 개발',
    role: '세이프디',
    summary: '사내 업무를 체계적으로 관리·추적하는 업무관리 시스템을 개발했습니다.',
    detail: '메인 업무 아래 하위 업무가 붙는 계층 구조로 업무를 관리하도록 설계하고, 업무마다 담당자와 진행 상태를 추적할 수 있게 했습니다. 캘린더 뷰로 담당 업무를 한눈에 볼 수 있도록 했고, 매일 업무 현황을 요약한 이메일을 자동 발송해 진행 상황 공유를 자동화했습니다.',
    results: [
      '메인 업무와 하위 업무로 이어지는 계층 구조로 업무를 관리',
      '업무별 담당자와 진행 상태를 추적할 수 있도록 구성',
      '캘린더 뷰를 통해 담당 업무를 한눈에 파악하도록 구현',
      '매일 업무 현황을 요약한 이메일을 자동 발송해 진행 상황 공유를 자동화'
    ],
    stack: [],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-2',
    year: '2025',
    period: '2025.04 – 2025.07 · 4개월',
    title: '주성엔지니어링 근로자 교육 시스템 개발',
    role: '세이프디',
    summary: '현장 방문 근로자를 대상으로 한 안전 교육·이력 관리 시스템을 개발했습니다.',
    detail: '근로자가 현장을 방문하면 서약서 작성 → 교육 영상 시청 → 테스트 수행으로 이어지는 온보딩 플로우를 구현했습니다. 테스트를 통과한 근로자는 이력을 기준으로 재시험을 면제하도록 했고, 어드민에서 교육 영상과 근로자 테스트 이력을 관리할 수 있게 했습니다.',
    results: [
      '근로자 방문 시 서약서 작성 → 교육 영상 시청 → 테스트 수행으로 이어지는 온보딩 플로우 구현',
      '테스트를 통과한 근로자는 재시험을 면제하도록 이력 기반 로직 구성',
      '어드민 기능으로 교육 영상 관리 및 근로자 테스트 이력 관리 기능 개발'
    ],
    stack: [],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-3',
    year: '2024',
    period: '2024.08 – 2024.09 · 2개월',
    title: '무중단 자동 배포 CI/CD 구축',
    role: '세이프디',
    summary: 'Tomcat 환경에 무중단 자동 배포 파이프라인을 설계·구축해 배포 중 서비스 중단을 제거했습니다.',
    detail: 'Tomcat 환경에 무중단 자동 배포 파이프라인을 설계하고 구축했습니다. 빌드가 실패하면 배포를 자동으로 중단하는 안전장치를 넣어 장애 배포를 사전에 막고, 배포가 성공하면 Apache 포트를 자동 전환해 무중단 전환을 구현했습니다.',
    results: [
      '빌드 실패 시 배포를 자동 중단하는 안전장치를 구현해 장애 배포를 사전 차단',
      '배포 성공 시 Apache 포트를 자동 전환하도록 구성해 무중단 전환 실현'
    ],
    stack: ['Tomcat', 'Apache', 'CI/CD'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-4',
    year: '2024',
    period: '2024',
    title: '모니터링 시스템 구축',
    role: '세이프디',
    summary: '시스템·애플리케이션 상태를 실시간으로 관측할 수 있는 모니터링 체계를 구축했습니다.',
    detail: 'Node Exporter로 서버 리소스 지표를 노출하고 Prometheus로 수집해 Grafana에서 시각화했습니다. 애플리케이션 로그는 Loki로 모아 같은 Grafana에서 지표와 함께 볼 수 있게 해 장애 원인을 추적하는 시간을 줄였습니다.',
    results: [
      'Node Exporter·Prometheus·Grafana로 시스템 리소스를 수집·시각화',
      'Loki·Grafana로 애플리케이션 로그를 수집·시각화해 장애 원인 추적 시간 단축'
    ],
    stack: ['Node Exporter', 'Prometheus', 'Grafana', 'Loki'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-5',
    year: '2023',
    period: '2022.12 – 2023.07 · 8개월',
    title: '크레딧 & 지불 시스템 개발',
    role: '(주)트레드링스',
    summary: '서비스 확장을 위해 사내 서비스 간 공통으로 사용하는 크레딧·지불 시스템을 설계 및 개발했습니다.',
    detail: '여러 사내 서비스가 공유하는 공통 크레딧 모듈을 설계하고 개발했습니다. 크레딧 사용에 대한 지불 시스템까지 함께 구축해 서비스마다 흩어져 있던 과금 체계를 하나로 통합했습니다.',
    results: [
      '여러 사내 서비스가 공유하는 공통 크레딧 모듈 개발',
      '크레딧 사용에 대한 지불 시스템 구축으로 서비스 간 과금 체계 통합'
    ],
    stack: [],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-6',
    year: '2021',
    period: '2021.01 – 2021.04 · 4개월',
    title: '에러 로깅 시스템 구축',
    role: '(주)트레드링스',
    summary: '운영 중인 전 서비스의 오류를 중앙에서 수집하는 체계를 구축했습니다.',
    detail: '운영 중인 모든 서비스에 공통 에러 처리 로직을 적용하고, 에러 메시지를 받아 처리하는 이벤트 핸들러를 구현해 오류를 한곳에서 모아 볼 수 있게 했습니다. 그만큼 장애 대응 속도가 빨라졌습니다.',
    results: [
      '전 서비스에 공통 에러 처리 로직 적용',
      '에러 메시지를 처리하는 이벤트 핸들러 구현으로 장애 대응 속도 향상'
    ],
    stack: [],
    repo: '', live: '', docs: []
  }
];

// 경력은 기간 · 직무 · 회사만 표시합니다. (상세 내용은 프로젝트 섹션에서)
const JOBS = [
  { period: '2023.10 – 현재',      role: '백엔드 개발 · 인프라 운영',   company: '세이프디 (2년 10개월)' },
  { period: '2020.02 – 2023.07',   role: '백엔드 개발',                 company: '(주)트레드링스 (3년 6개월)' },
  { period: '2019.04 – 2020.02',   role: 'EAI 시스템 개발 · 운영',      company: '(주)이포즌 (11개월)' },
  { period: '2017.08 – 2019.02',   role: '프로젝트 모듈 개발',          company: '(주)이나우테크놀로지 (1년 7개월)' }
];
