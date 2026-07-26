/* =========================================================
   프로필 데이터
   여기만 고치면 화면 전체가 바뀝니다. (마크업 수정 불필요)
   내용은 이력서 `2025 최종.pdf` 기준입니다.
   ========================================================= */

// 화면 동작 옵션 — 원본 Design Canvas의 props에 대응합니다.
const CONFIG = {
  // 숙련도 막대는 객관적 근거가 없어 꺼 두었습니다.
  // 켜려면 true로 바꾸고 아래 SKILLS의 pct 값을 직접 조정하세요.
  showSkillBars: false,
  revealOnScroll: true,  // 스크롤 시 섹션 등장 애니메이션
  availability: '세이프디 재직 중'
};

const SKILLS = [
  { name: 'Java · Spring Boot', cat: 'backend', pct: 90, note: '주력' },
  { name: 'Spring Framework', cat: 'backend', pct: 85, note: '레거시 운영 · 리팩터링' },
  { name: 'JPA', cat: 'backend', pct: 75, note: '데이터 접근' },
  { name: 'Kotlin', cat: 'backend', pct: 65, note: '보유 기술' },
  { name: 'Node.js · Puppeteer', cat: 'backend', pct: 90, note: '데이터 수집' },
  { name: 'Nest.js · TypeScript', cat: 'backend', pct: 70, note: '실무 도입' },
  { name: 'JavaScript', cat: 'backend', pct: 85, note: '수집 · 스크립트' },
  { name: 'Oracle', cat: 'data', pct: 75, note: '보유 기술' },
  { name: 'MySQL', cat: 'data', pct: 80, note: '보유 기술' },
  { name: 'Redis', cat: 'data', pct: 70, note: '세션 캐시' },
  { name: '메시지 큐', cat: 'data', pct: 70, note: '대용량 데이터 연동' },
  { name: 'Microsoft Azure · AKS', cat: 'infra', pct: 65, note: 'Kubernetes 배포 환경' },
  { name: 'Prometheus · Grafana · Loki', cat: 'infra', pct: 75, note: '모니터링 · 로그 수집' },
  { name: 'CI/CD (Tomcat · Apache)', cat: 'infra', pct: 75, note: '무중단 자동 배포' },
  { name: 'Git · GitHub', cat: 'infra', pct: 85, note: '형상 관리' },
  { name: 'Vue.js', cat: 'frontend', pct: 60, note: '보유 기술' },
  { name: 'HTML', cat: 'frontend', pct: 70, note: '보유 기술' }
];

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'backend', label: '백엔드' },
  { id: 'data', label: '데이터' },
  { id: 'infra', label: '인프라' },
  { id: 'frontend', label: '프론트엔드' }
];

const WORK_PROJECTS = [
  {
    slotId: 'work-1',
    year: '2024',
    period: '2024.08 – 2024.09 · 2개월',
    title: '무중단 자동 배포 CI/CD 구축',
    role: '세이프디',
    summary: '톰캣 환경에 무중단으로 자동 배포하기 위한 CI/CD를 구축했습니다.',
    detail: '톰캣 환경에 무중단으로 자동 배포하기 위한 CI/CD를 구축했습니다. 빌드 단계에서 실패하면 배포로 넘어가지 않도록 막고, 배포가 성공하면 Apache의 포트를 자동으로 전환하도록 구현해 배포 중에도 요청이 끊기지 않도록 했습니다.',
    results: [
      '빌드 실패 시 배포 중단 기능 구현',
      '배포 성공 시 자동으로 Apache 포트 변경 기능 구현'
    ],
    stack: ['Tomcat', 'Apache', 'CI/CD'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-2',
    year: '2024',
    period: '2024.03 · 1개월',
    title: '모니터링 시스템 구축',
    role: '세이프디',
    summary: '시스템 리소스와 애플리케이션 로그를 수집해 한곳에서 확인할 수 있는 모니터링 환경을 만들었습니다.',
    detail: 'Node Exporter로 서버 리소스 지표를 노출하고 Prometheus로 수집해 Grafana 대시보드에 시각화했습니다. 애플리케이션 로그는 Loki로 모아 같은 Grafana에서 지표와 함께 확인할 수 있도록 구성했습니다.',
    results: [
      'Node Exporter, Prometheus, Grafana를 활용해 시스템 리소스 수집 후 시각화',
      'Loki, Grafana를 활용해 애플리케이션 로그 수집 후 시각화'
    ],
    stack: ['Node Exporter', 'Prometheus', 'Grafana', 'Loki'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-3',
    year: '2023',
    period: '2022.12 – 2023.07 · 8개월',
    title: '크레딧 & 지불 시스템 개발',
    role: '(주)트레드링스',
    summary: '서비스 확장을 위해 사내 서비스들이 공통으로 사용할 크레딧과 지불 시스템을 개발했습니다.',
    detail: '사내 서비스들이 각자 다루던 재화를 하나로 묶기 위해 공통 크레딧을 설계하고 개발했습니다. 이 크레딧을 실제로 차감하고 처리하는 지불 시스템도 함께 만들었습니다.',
    results: [
      '사내 서비스들 간에 공통으로 사용할 공통 크레딧 개발',
      '공통 크레딧에 대한 지불 시스템 개발'
    ],
    stack: [],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-4',
    year: '2021',
    period: '2021.01 – 2021.04 · 4개월',
    title: '에러 메세지 로깅 시스템',
    role: '(주)트레드링스',
    summary: '운영 중인 모든 서비스에서 발생하는 오류를 한곳에 수집하는 시스템을 만들었습니다.',
    detail: '서비스마다 제각각이던 오류 처리를 공통 로직으로 통일하고, 발생한 에러 메세지를 받아 처리하는 이벤트 핸들러를 추가해 오류를 한곳에 모았습니다.',
    results: [
      '운영중인 모든 서비스에 공통 에러 처리 로직 추가',
      '에러 메세지를 처리하는 이벤트 핸들러 추가'
    ],
    stack: [],
    repo: '', live: '', docs: []
  }
];

const JOBS = [
  {
    period: '2024.07 – 현재',
    role: '백엔드 개발 · 정규직',
    company: '세이프디 (2년 1개월)',
    points: [
      'Node Exporter·Prometheus·Grafana·Loki로 시스템 리소스와 애플리케이션 로그를 수집·시각화하는 모니터링 환경을 구축했습니다.',
      '톰캣 환경에 무중단으로 자동 배포하는 CI/CD를 구축했습니다.',
      '인메모리로 관리하던 세션을 Redis로 옮겨 배포 후에도 로그인 상태가 유지되도록 했습니다.'
    ]
  },
  {
    period: '2023.10 – 2024.06',
    role: '백엔드 개발 · 정규직',
    company: '세이프디 (9개월)',
    points: [
      '분류되지 않은 기존 레거시 코드를 화면·도메인 단위로 분리했습니다.',
      '흩어져 중복되던 로직을 공통 코드로 정리했습니다.'
    ]
  },
  {
    period: '2020.02 – 2023.07',
    role: '백엔드 개발',
    company: '(주)트레드링스 (3년 6개월)',
    points: [
      '사내 서비스들이 공통으로 사용할 크레딧과 그에 대한 지불 시스템을 개발했습니다.',
      'Node.js·Puppeteer 기반 데이터 수집 프로그램을 만들고, 수집 모듈 약 40개의 로직과 구조를 개선했습니다.',
      '외부 기업과의 데이터 연동 API, 공통 에러 로깅 시스템, 서비스 운영용 모니터링 툴을 개발했습니다.'
    ]
  },
  {
    period: '2019.04 – 2020.02',
    role: 'EAI 시스템 개발 · 유지보수',
    company: '(주)이포즌 (11개월)',
    points: [
      'SK Hynix 이천 공장 RnD 센터에서 근무하며 MES 시스템 간의 데이터 연동을 담당하는 EAI 시스템을 개발하고 유지보수했습니다.'
    ]
  },
  {
    period: '2017.08 – 2019.02',
    role: '프로젝트 모듈 개발',
    company: '(주)이나우테크놀로지 (1년 7개월)',
    points: [
      'SKT TANGO(5G 전환 사업)의 프로젝트 모듈을 개발했습니다.'
    ]
  }
];
