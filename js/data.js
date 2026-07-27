/* =========================================================
   프로필 데이터
   여기만 고치면 화면 전체가 바뀝니다. (마크업 수정 불필요)
   내용은 이력서 원문 `RESUME.md` 기준입니다.
   ========================================================= */

// 화면 동작 옵션 — 원본 Design Canvas의 props에 대응합니다.
const CONFIG = {
  // 숙련도 막대 표시. 막대 길이는 SKILLS의 pct 값입니다.
  showSkillBars: true,
  revealOnScroll: true,  // 스크롤 시 섹션 등장 애니메이션

  // 프로젝트 카드의 초기 펼침 상태
  //   'none'  — 전부 접음 (기본)
  //   'first' — 묶음별 첫 프로젝트만 펼침
  //   'all'   — 전부 펼침
  projectsOpenOnLoad: 'none',

  // 처음 열려 있을 탭 (TABS의 id). 없거나 꺼진 탭이면 첫 번째 탭이 열립니다.
  defaultTab: 'experience'
};

/* ---------------------------------------------------------
   탭 구성 (index-copy.html의 상세 영역)
   순서 · 이름 · 표시 여부를 여기서 관리합니다. 배열 순서가 탭 순서입니다.

     enabled — false로 두면 탭과 내용이 함께 빠집니다.
     content — 패널에 넣을 내용. 아래 다섯 가지 중 하나만 쓸 수 있습니다.
                 'jobs'         → JOBS + WORK_PROJECTS (회사별 경력)
                 'projects'     → PROJECTS (업무 대표 프로젝트)
                 'sideProjects' → SIDE_PROJECTS (개인 프로젝트)
                 'skills'       → SKILLS + CATEGORIES (기술 스택)
                 'education'    → EDUCATION + CERTIFICATES (학력 · 자격증)
     theme   — 패널 배색. 'blue'(파란 배경) / 'cream'(밝은 배경)
               프로젝트 카드는 파란 배경용, 숙련도 막대는 밝은 배경용 스타일입니다.
   --------------------------------------------------------- */
const TABS = [
  { id: 'experience', label: '경력',         content: 'jobs',         theme: 'blue',  enabled: true },
  { id: 'skills',     label: '기술 스택',     content: 'skills',       theme: 'cream', enabled: true },
  { id: 'projects',   label: '프로젝트',      content: 'projects',     theme: 'blue',  enabled: false },
  { id: 'side',       label: '개인 프로젝트', content: 'sideProjects', theme: 'cream', enabled: false },
  { id: 'education',  label: '학력 · 자격증', content: 'education',    theme: 'cream', enabled: true },
];

// 분류는 이력서의 스킬 구분을 그대로 따릅니다.
// pct는 막대 길이(0~100)입니다. 화면에 숫자로 나오지는 않습니다.
const SKILLS = [
  { name: 'Java', cat: 'lang', pct: 90, note: '주력' },
  { name: 'Node.js', cat: 'backend', pct: 80, note: '실무 경험' },
  { name: 'TypeScript', cat: 'lang', pct: 70, note: '실무 경험' },
  { name: 'Kotlin', cat: 'lang', pct: 65, note: '실무 경험' },

  { name: 'Spring Boot', cat: 'backend', pct: 90, note: '주력' },
  { name: 'Spring Batch', cat: 'backend', pct: 80, note: '주력' },
  { name: 'Nest.js', cat: 'backend', pct: 70, note: '실무 경험'},
  { name: 'Vue.js', cat: 'frontend', pct: 70, note: '실무 경험' },
  { name: 'Spring JPA', cat: 'backend', pct: 90, note: '주력' },
  { name: 'Mybatis', cat: 'backend', pct: 90, note: '주력' },

  { name: 'MySQL', cat: 'database', pct: 80, note: '성능 튜닝' },
  { name: 'MSSQL', cat: 'database', pct: 80, note: '성능 튜닝' },
  { name: 'MongoDB', cat: 'database', pct: 80, note: '실무 경험' },
  { name: 'Redis', cat: 'database', pct: 70, note: '세션 캐시' },
  { name: 'RabbitMQ', cat: 'database', pct: 70, note: '실무 경험' },

  { name: 'Microsoft Azure', cat: 'devops', pct: 65, note: '' },
  { name: '네이버클라우드플랫폼', cat: 'devops', pct: 65, note: '' },
  { name: 'AWS', cat: 'devops', pct: 65, note: '' },

  { name: 'Prometheus · Grafana · Loki', cat: 'devops', pct: 75, note: '모니터링 · 로그 수집' },

];

const CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'lang', label: '언어' },
  { id: 'backend', label: '백엔드' },
  { id: 'frontend', label: '프론트엔드' },
  { id: 'database', label: '데이터베이스' },
  { id: 'devops', label: 'DevOps · 인프라' },
];

// company 값은 JOBS의 company와 같아야 경력 항목 아래에 묶여 표시됩니다.
const WORK_PROJECTS = [
  {
    period: '2026.05 · 2주 · 단독 수행',
    title: '레거시 복합키 → 단일 대리키 PK 마이그레이션',
    company: '세이프디',
    summary: '복합키 구조로 인해 JPA 연관관계 매핑이 복잡해지는 문제를 해소하고자 운영 중인 서비스의 PK 구조를 무중단으로 전면 재설계',
    results: [
      '위험성평가(최초·정기·수시)·부적합보고서·시정조치요구·안전교육 등 40~50개 테이블 대상',
      '신규 테이블 생성 → 데이터 이관 → 검증 → 테이블명 스왑 방식으로 서비스 중단 없이 전환',
      '이관 전후 건수 대조 및 검증 절차를 거쳐 데이터 정합성 확보, 단계별 SQL·RUNBOOK 문서화',
      '레거시 시퀀스 컬럼 의존을 제거하고 엔티티 연관관계를 대리키 기반으로 정리',
      'JPA 점진 전환의 선행 작업으로 수행해 이후 도메인 리팩토링 기반 확보'
    ],
    stack: ['MySQL 8', 'JPA', '데이터 마이그레이션'],
    repo: '', live: ''
  },
  {
    period: '2025.09 – 2025.12 · 4개월',
    title: '주성엔지니어링 업무관리시스템 개발',
    company: '세이프디',
    summary: '사내 업무를 체계적으로 관리·추적하는 업무관리 시스템을 개발',
    results: [
      '메인 업무와 하위 업무로 이어지는 계층 구조로 업무를 관리',
      '업무별 담당자와 진행 상태를 추적할 수 있도록 구성',
      '캘린더 뷰를 통해 담당 업무를 한눈에 파악하도록 구현',
      '매일 업무 현황을 요약한 이메일을 자동 발송해 진행 상황 공유를 자동화'
    ],
    stack: [],
    repo: '', live: ''
  },
  {
    period: '2025.04 – 2025.07 · 4개월',
    title: '주성엔지니어링 근로자 교육 시스템 개발',
    company: '세이프디',
    summary: '현장 방문 근로자를 대상으로 한 안전 교육·이력 관리 시스템을 개발',
    results: [
      '근로자 방문 시 서약서 작성 → 교육 영상 시청 → 테스트 수행으로 이어지는 온보딩 플로우 구현',
      '테스트를 통과한 근로자는 재시험을 면제하도록 이력 기반 로직 구성',
      '어드민 기능으로 교육 영상 관리 및 근로자 테스트 이력 관리 기능 개발'
    ],
    stack: [],
    repo: '', live: ''
  },
  {
    period: '2024.08 – 2024.11 · 4개월 · 단독 수행',
    title: '푸시·SMS 메시징 인프라 재구축',
    company: '세이프디',
    summary: '각 도메인에 동기 호출로 흩어져 있던 알림 발송을 큐 기반 독립 서비스로 전환해 발송 실패 시 재시도와 이력 추적이 불가능하던 문제를 해결',
    results: [
      '발송 실패 건을 추적하고 재발송할 수 있도록 데드레터 저장 및 재시도 정책 도입',
      '점검일지·작업허가서·TBM·위험성평가 등 12개 도메인의 알림 발송을 신규 서비스로 일괄 이관',
      'FCM 신규 API 전환 및 레거시 SMS 제거, safed-push 독립 모듈로 분리',
      '푸시·SMS 발송 이력 테이블을 정규화해 발송 내역 조회 기능 제공',
      '일 6,000건 규모의 푸시 발송을 안정적으로 처리'
    ],
    stack: ['Java', 'Spring Boot', 'RabbitMQ', 'FCM'],
    repo: '', live: ''
  },
  {
    period: '2024.08 – 2024.09 · 2개월  · 단독 수행',
    title: '무중단 자동 배포 CI/CD 구축',
    company: '세이프디',
    summary: 'Tomcat 환경에 무중단 자동 배포 파이프라인을 설계·구축해 배포 중 서비스 중단을 제거',
    results: [
      '빌드 실패 시 배포를 자동 중단하는 안전장치를 구현해 장애 배포를 사전 차단',
      '배포 성공 시 Apache 포트를 자동 전환하도록 구성해 무중단 전환 실현'
    ],
    stack: ['Tomcat', 'Apache', 'CI/CD'],
    repo: '', live: ''
  },
  {
    period: '2024.07 – 2024.07 · 1개월',
    title: '세션·인증 관리 체계 구축 · 단독 수행',
    company: '세이프디',
    summary: 'Tomcat 재배포 시 세션이 소실되어 로그아웃되던 문제 해결과 함께, 운영 중 세션 상태를 관리·추적할 수 있는 어드민 기능까지 확보',
    results: [
      'Redis 기반 커스텀 세션 저장소를 구현해 배포 후에도 로그인 상태 유지',
      '세션 키를 Lookup/Data 구조로 분리해 사용자 단위 세션 조회 및 일괄 제어 지원',
      '어드민에서 세션 데이터 조회, 특정 세션 종료, 사용자 전체 세션 강제 종료 기능 구현',
      '세션 기기 관리 및 인증 이력 조회 기능으로 확장해 로그인 이슈 디버깅 시간 단축'
    ],
    stack: ['Java', 'Spring Boot', 'Redis', 'Spring Security'],
    repo: '', live: ''
  },
  {
    period: '2024',
    title: '모니터링 시스템 구축',
    company: '세이프디',
    summary: '시스템·애플리케이션 상태를 실시간으로 관측할 수 있는 모니터링 체계를 구축',
    results: [
      'Node Exporter·Prometheus·Grafana로 시스템 리소스를 수집·시각화',
      'Loki·Grafana로 애플리케이션 로그를 수집·시각화해 장애 원인 추적 시간 단축'
    ],
    stack: ['Node Exporter', 'Prometheus', 'Grafana', 'Loki'],
    repo: '', live: ''
  },
  {
    period: '2022.12 – 2023.07 · 8개월',
    title: '크레딧 & 지불 시스템 개발',
    company: '(주)트레드링스',
    summary: '서비스 확장을 위해 사내 서비스 간 공통으로 사용하는 크레딧·지불 시스템을 설계 및 개발',
    results: [
      '여러 사내 서비스가 공유하는 공통 크레딧 모듈 개발',
      '크레딧 사용에 대한 지불 시스템 구축으로 서비스 간 과금 체계 통합'
    ],
    stack: [],
    repo: '', live: ''
  },
  {
    period: '2021.01 – 2021.04 · 4개월',
    title: '에러 로깅 시스템 구축',
    company: '(주)트레드링스',
    summary: '운영 중인 전 서비스의 오류를 중앙에서 수집하는 체계를 구축',
    results: [
      '전 서비스에 공통 에러 처리 로직 적용',
      '에러 메시지를 처리하는 이벤트 핸들러 구현으로 장애 대응 속도 향상'
    ],
    stack: [],
    repo: '', live: ''
  },
  {
    period: '2019.04 – 2020.02 · 11개월',
    title: 'SK하이닉스 EAI 시스템 운영 및 인터페이스 개발',
    company: '(주)이포즌',
    summary: '반도체 제조 라인의 시스템 간 데이터 연동을 담당하는 EAI 파트 수행',
    results: [
      'TIBCO BusinessWorks 기반 EAI 프로세스 운영 환경에서 인터페이스 개발·유지보수',
      'M14·M16 팹 생산 시스템 간 실시간 데이터 연동 인터페이스 구현',
      '인터페이스 장애 모니터링 및 원인 분석·재처리로 데이터 유실 방지',
      '요건 협의부터 인터페이스 정의서 작성·개발·테스트·운영 이관까지 전 과정 수행'
    ],
    stack: ['TIBCO BusinessWorks', 'Oracle'],
    repo: '', live: ''
  },
  {
    period: '2017.08 – 2020.01 · 2년 6개월',
    title: 'SK텔레콤 네트워크 운용지원시스템(TANGO) 개발/운영',
    company: '(주)이나우테크놀로지',
    summary: 'LTE·5G 네트워크 장비의 관리·감시·분석을 담당하는 OSS 플랫폼 중 구축(EC) 모듈 개발에 참여',
    results: [
      '5G 전국망 구축 시기 기지국 신설·증설 업무를 지원하는 EC 모듈 화면·기능 개발',
      '대량 데이터 조회·집계 화면 구현 / 엑셀 업로드·다운로드 기능 개발'
    ],
    stack: ['Java', 'Spring MVC', 'JSP', 'Tomcat', 'Oracle', 'Jennifer'],
    repo: '', live: ''
  }
];

const JOBS = [
  { period: '2023.10 – 현재',      role: '백엔드 개발 & 인프라 운영 · 과장',   company: '세이프디' },
  { period: '2020.02 – 2023.07',   role: '백엔드 개발 · 대리',                 company: '(주)트레드링스' },
  { period: '2019.04 – 2020.02',   role: 'EAI 개발 & 운영 · 사원',      company: '(주)이포즌' },
  { period: '2017.08 – 2020.01',   role: '프로젝트 모듈 개발 · 사원',          company: '(주)이나우테크놀로지' }
];

// '학력 · 자격증' 탭 — 학력 목록
const EDUCATION = [
  {
    period: '2009.03 – 2017.02',
    school: '한양대학교 ERICA',
    major: '전자통신공학과',
    note: '졸업'
  }
];

// '학력 · 자격증' 탭 — 자격증 목록. issuer(발급 기관)는 비워 두면 표시되지 않습니다.
const CERTIFICATES = [
  {
    date: '2019.08',
    name: '정보처리기사',
    issuer: ''
  }
];

/* =========================================================
   ⚠ 아래 PROJECTS · SIDE_PROJECTS는 레이아웃 확인용 예시입니다.
      실제 내용으로 바꾼 뒤 공개하세요.
   ========================================================= */

// '프로젝트' 탭 — 회사 구분 없이 대표 프로젝트만 모아서 보여줍니다.
// company 항목이 필요 없다는 점 말고는 WORK_PROJECTS와 형식이 같습니다.
const PROJECTS = [
  {
    period: '2025.01 – 2025.03 · 3개월',
    title: '데이터 수집 플랫폼 고도화',
    summary: '수집 대상 증가로 지연이 발생하던 배치 파이프라인을 재설계했습니다. (예시)',
    results: [
      '수집 작업을 큐 기반으로 분리해 대상별로 병렬 처리하도록 변경',
      '실패한 작업만 골라 재처리하는 재시도 구조를 도입해 수동 대응 제거',
      '일 평균 수집 소요 시간을 기존 대비 절반 수준으로 단축'
    ],
    stack: ['Spring Boot', 'Spring Batch', 'MongoDB', 'RabbitMQ'],
    repo: '', live: ''
  },
  {
    period: '2024.10 – 2024.12 · 3개월',
    title: '세션 관리 서버 분리',
    summary: '서버 증설 시 로그인이 풀리던 문제를 세션 저장소 분리로 해결했습니다. (예시)',
    results: [
      'WAS 메모리에 있던 세션을 Redis로 옮겨 서버 간 공유',
      '무중단 배포 중에도 로그인 상태가 유지되도록 만료 정책 정리'
    ],
    stack: ['Spring Boot', 'Redis'],
    repo: '', live: ''
  },
  {
    period: '2024.05 – 2024.06 · 2개월',
    title: '레거시 API 응답 속도 개선',
    summary: '조회가 몰리는 시간대에 느려지던 주요 API를 튜닝했습니다. (예시)',
    results: [
      '슬로우 쿼리 로그를 분석해 인덱스 누락 구간을 찾아 보완',
      '반복 조회되는 코드성 데이터를 캐시로 옮겨 DB 부하 감소'
    ],
    stack: ['MySQL', 'Spring JPA', 'Redis'],
    repo: '', live: ''
  }
];

/* '개인 프로젝트' 탭 — 카드로 나열하고, 카드를 누르면 모달에서 상세를 봅니다.

     [카드에 보이는 것]
       thumb   — 카드 썸네일 경로. 비우면 shots의 첫 장을 쓰고, 그것도 없으면
                 제목 첫 글자가 대신 들어갑니다.
       period · title · summary · stack(앞 4개까지)

     [모달에 보이는 것]
       shots       — 스크린샷 목록. 두 장 이상이면 좌우 버튼 · 점 · 키보드(←→)로 넘깁니다.
                     { src: '경로', alt: '설명' } 형식이고, 비워 두면 스크린샷 영역이 빠집니다.
       description — 상세 설명. 비우면 summary가 대신 쓰입니다.
       results     — 주요 작업 목록
       stack       — 기술 스택 전체
       repo · live — 링크. 값이 있는 것만 표시됩니다.
   --------------------------------------------------------- */
const SIDE_PROJECTS = [
  {
    period: '2026.06 – 현재',
    title: '이력서 정적 사이트',
    summary: '데이터 파일만 고치면 화면이 갱신되는 이력서 사이트입니다. (예시)',
    thumb: '',
    shots: [
      { src: './images/projects/sample-1.svg', alt: '경력 탭 화면 (예시 이미지)' },
      { src: './images/projects/sample-2.svg', alt: '기술 스택 탭 화면 (예시 이미지)' },
      { src: './images/projects/sample-3.svg', alt: '개인 프로젝트 카드 화면 (예시 이미지)' }
    ],
    description: '이력서 내용을 데이터 파일 한 곳에 모아 두고, 화면은 그 데이터를 읽어 그리도록 만든 정적 사이트입니다. 별도 빌드 도구 없이 HTML·CSS·JavaScript만 사용했습니다. (예시)',
    results: [
      '내용을 data.js 한 곳에 모아 마크업 수정 없이 갱신되도록 구성',
      '경력 · 프로젝트 · 기술 스택을 탭과 아코디언으로 정리',
      '인쇄 시 접힌 내용까지 펼쳐지도록 별도 인쇄 스타일 작성'
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/traumereiii', live: ''
  },
  {
    period: '2025.02 – 2025.05 · 4개월',
    title: '독서 기록 서비스',
    summary: '읽은 책과 메모를 남기고 월별로 돌아볼 수 있는 개인용 서비스입니다. (예시)',
    thumb: '',
    shots: [
      { src: './images/projects/sample-1.svg', alt: '독서 목록 화면 (예시 이미지)' },
      { src: './images/projects/sample-2.svg', alt: '도서 검색 화면 (예시 이미지)' },
      { src: './images/projects/sample-3.svg', alt: '월별 회고 화면 (예시 이미지)' }
    ],
    description: '읽은 책을 기록하고 메모를 남긴 뒤, 월 단위로 모아 볼 수 있게 만든 개인용 서비스입니다. 도서 정보는 외부 검색 API에서 받아 채웁니다. (예시)',
    results: [
      '도서 검색 API를 연동해 책 정보를 자동으로 채우도록 구현',
      '월별 독서량과 메모를 모아 보는 회고 화면 제작',
      '읽는 중 · 완독 상태를 나눠 목록에서 바로 구분되도록 구성'
    ],
    stack: ['Kotlin', 'Spring Boot', 'Vue.js', 'MySQL'],
    repo: 'https://github.com/traumereiii', live: ''
  },
  {
    period: '2024.11 – 2024.12 · 2개월',
    title: '배포 알림 봇',
    summary: '배포 결과를 메신저로 알려 주는 봇입니다. (예시)',
    thumb: '',
    shots: [
      { src: './images/projects/sample-1.svg', alt: '배포 성공 알림 메시지 (예시 이미지)' },
      { src: './images/projects/sample-2.svg', alt: '배포 실패 알림 메시지 (예시 이미지)' },
      { src: './images/projects/sample-3.svg', alt: '알림 채널 설정 화면 (예시 이미지)' }
    ],
    description: 'CI 파이프라인의 배포 결과를 받아 메신저 채널로 알려 주는 봇입니다. 실패했을 때 원인을 찾아 들어가는 시간을 줄이는 데 목적을 뒀습니다. (예시)',
    results: [
      'CI 결과를 받아 성공 · 실패를 채널에 전달하도록 연동',
      '실패 시 최근 커밋과 로그 링크를 함께 보내 원인 확인 시간 단축',
      '서비스별로 알림 채널을 나눠 받도록 설정 기능 추가'
    ],
    stack: ['Node.js', 'TypeScript'],
    repo: 'https://github.com/traumereiii', live: ''
  }
];
