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
    period: '2024.08 · 1개월',
    title: 'Redis를 활용한 세션 캐싱',
    role: '세이프디',
    summary: '인메모리로 관리하던 세션을 외부 캐시로 옮겨 배포 후에도 로그인 상태가 유지되도록 했습니다.',
    detail: '애플리케이션 메모리에 두던 세션을 외부 캐시(Redis)에 저장하도록 구성했습니다. 세션이 애플리케이션과 분리되면서 배포로 인스턴스가 재기동되어도 사용자가 다시 로그인할 필요가 없어졌습니다.',
    results: [
      '인메모리로 관리하던 세션을 외부 캐시(Redis)에 저장하도록 구성',
      '애플리케이션 배포 후에도 로그인 상태 유지'
    ],
    stack: ['Redis'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-3',
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
    slotId: 'work-4',
    year: '2023',
    period: '2023.10 – 2023.12 · 3개월',
    title: '레거시 리팩토링',
    role: '세이프디',
    summary: '분류되지 않은 기존 레거시 코드를 화면과 도메인 단위로 나누고 공통 코드를 정리했습니다.',
    detail: '구조가 잡히지 않은 채 쌓여 있던 레거시 코드를 화면별·도메인별로 분리했습니다. 여러 곳에 흩어져 중복되던 로직은 공통 코드로 묶어 정리했습니다.',
    results: [
      '분류되지 않은 기존 레거시 코드를 화면 & 도메인 별로 분리',
      '공통 코드 작업'
    ],
    stack: [],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-5',
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
    slotId: 'work-6',
    year: '2022',
    period: '2022.04 – 2022.10 · 7개월',
    title: 'ShipGo 모니터링 시스템',
    role: '(주)트레드링스',
    summary: '서비스 운영을 위한 모니터링 툴을 개발했습니다.',
    detail: '데이터 파이프라인이 정상적으로 동작하는지, 수집된 데이터가 제대로 들어왔는지 운영자가 직접 확인할 수 있는 도구를 개발했습니다. 배포 과정도 함께 자동화했습니다.',
    results: [
      '파이프라인 별 데이터 확인',
      '수집 데이터 확인',
      '배포 자동화'
    ],
    stack: [],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-7',
    year: '2021',
    period: '2021.04 – 2021.12 · 9개월',
    title: 'ShipGo 서비스 확장',
    role: '(주)트레드링스',
    summary: '운영 중인 서비스의 데이터 수집 및 활용 범위를 확장했습니다.',
    detail: '수집 범위를 넓히기 위해 약 40개에 이르는 데이터 수집 모듈의 로직을 수정하고 구조를 개선했습니다. 수집 파이프라인의 로직도 함께 손봤고, 확장된 데이터를 외부에 제공하기 위한 API를 개발했습니다.',
    results: [
      '데이터 수집 모듈(약 40개)의 수집 로직 수정 및 구조 개선',
      '데이터 수집 파이프라인의 로직 수정',
      '확장된 데이터를 제공하기 위한 API 개발'
    ],
    stack: [],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-8',
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
  },
  {
    slotId: 'work-9',
    year: '2020',
    period: '2020.09 – 2020.12 · 4개월',
    title: '외부 기업과 데이터 연동을 위한 API 개발',
    role: '(주)트레드링스',
    summary: '국내 모 선사와 MOU를 체결해 데이터를 상호간에 주고받기 위한 API를 개발했습니다.',
    detail: '국내 모 선사와 MOU를 체결하여 데이터를 상호간에 주고 받기로 하면서, 자사 보유 데이터를 제공하는 API와 거래 업체의 데이터를 전달받는 API를 함께 개발했습니다. 메세지 큐를 활용해 대용량 데이터도 유실 없이 처리할 수 있도록 했습니다.',
    results: [
      '자사 보유 데이터를 제공하기 위한 API 개발',
      '거래 업체의 데이터를 전달 받기 위한 API 개발',
      '메세지 큐를 활용하여 대용량 데이터에 대해 유실 없이 처리 가능'
    ],
    stack: ['메시지 큐'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-10',
    year: '2020',
    period: '2020.02 – 2020.08 · 7개월',
    title: '데이터 수집 프로그램 개발',
    role: '(주)트레드링스',
    summary: '서비스 운영에 필요한 데이터 수집을 자동화해주는 프로그램을 개발했습니다.',
    detail: 'Node.js와 Puppeteer를 활용해 서비스 운영에 필요한 데이터를 자동으로 수집하는 프로그램을 개발했습니다.',
    results: [
      '서비스 운영에 필요한 데이터 수집 자동화',
      'Node.js, Puppeteer 활용'
    ],
    stack: ['Node.js', 'Puppeteer'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-11',
    year: '2019',
    period: '2019.04 – 2020.01 · 10개월',
    title: 'SK Hynix EAI',
    role: '(주)이포즌',
    summary: 'MES 시스템 간의 데이터 연동을 담당하는 EAI 시스템을 개발하고 유지보수했습니다.',
    detail: 'SK Hynix 이천 공장 RnD 센터에서 근무하며 MES 시스템간의 데이터 연동을 담당하는 EAI 시스템을 개발 및 유지보수했습니다.',
    results: [
      'MES 시스템 간 데이터 연동을 담당하는 EAI 시스템 개발',
      'EAI 시스템 유지보수'
    ],
    stack: ['EAI', 'MES'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-12',
    year: '2017',
    period: '2017.08 – 2018.12 · 1년 5개월',
    title: 'TANGO',
    role: '(주)이나우테크놀로지',
    summary: 'SKT TANGO(5G 전환 사업)의 프로젝트 모듈을 개발했습니다.',
    detail: 'SKT의 5G 전환 사업인 TANGO 프로젝트에 참여해 프로젝트 모듈을 개발했습니다.',
    results: [
      'SKT TANGO(5G 전환 사업)의 프로젝트 모듈 개발'
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
