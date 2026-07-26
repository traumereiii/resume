/* =========================================================
   프로필 데이터
   여기만 고치면 화면 전체가 바뀝니다. (마크업 수정 불필요)
   ========================================================= */

// 화면 동작 옵션 — 원본 Design Canvas의 props에 대응합니다.
const CONFIG = {
  showSkillBars: true,   // 기술 스택 막대 표시 여부
  revealOnScroll: true,  // 스크롤 시 섹션 등장 애니메이션
  availability: '2026년 3분기 프로젝트 논의 가능'
};

const SKILLS = [
  { name: 'Java · Spring Boot', cat: 'backend', pct: 95, note: '주력' },
  { name: 'Kotlin', cat: 'backend', pct: 80, note: '실무 2년' },
  { name: 'Python', cat: 'backend', pct: 75, note: '배치 · 스크립트' },
  { name: 'PostgreSQL · MySQL', cat: 'data', pct: 90, note: '설계 · 튜닝' },
  { name: 'Kafka', cat: 'data', pct: 78, note: '이벤트 파이프라인' },
  { name: 'Redis', cat: 'data', pct: 82, note: '캐시 · 큐' },
  { name: 'AWS (ECS, RDS, S3)', cat: 'infra', pct: 85, note: '운영' },
  { name: 'Terraform', cat: 'infra', pct: 70, note: 'IaC' },
  { name: 'Docker · GitHub Actions', cat: 'infra', pct: 88, note: 'CI/CD' },
  { name: 'TypeScript · React', cat: 'frontend', pct: 65, note: '보조' }
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
    year: '2025',
    period: '2025.02 – 2025.09 · 8개월',
    title: '구독 결제 정산 시스템',
    role: '백엔드 리드',
    summary: '월 12만 건 구독 결제의 청구·환불·정산을 처리하는 시스템을 새로 설계했습니다.',
    detail: '기존 단일 서비스에 얽혀 있던 결제 로직을 분리해 별도 도메인으로 재구성했습니다. 청구 주기 계산, 부분 환불, 대금 정산을 각각 독립된 워크플로로 나누고 이벤트 기반으로 연결해 실패 지점을 좁혔습니다. 이중 청구를 막기 위한 멱등 키 체계와 대장 기반 대조 배치를 함께 도입했습니다.',
    results: ['결제 실패 재처리 자동화로 CS 문의 41% 감소', '정산 마감 소요 시간 6시간 → 40분', '이중 청구 사고 0건 유지 (12개월)'],
    stack: ['Kotlin', 'Spring Boot', 'Kafka', 'PostgreSQL'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-2',
    year: '2024',
    period: '2024.01 – 2024.06 · 6개월',
    title: '실시간 재고 동기화 API',
    role: '백엔드 개발',
    summary: '여러 물류 창고와 오픈마켓 사이의 재고 수치를 초 단위로 맞추는 API를 만들었습니다.',
    detail: '창고 시스템 4곳과 오픈마켓 3곳의 서로 다른 갱신 주기를 흡수하는 중간 계층을 두었습니다. 변경 이벤트를 스트림으로 받아 병합하고, 판매 채널에는 변경분만 밀어 넣는 방식으로 호출량을 줄였습니다. 재고 음수 방지를 위해 예약 수량 개념을 도입했습니다.',
    results: ['품절 주문 취소율 2.8% → 0.4%', '외부 API 호출량 63% 절감', 'p99 응답 시간 180ms 유지'],
    stack: ['Java', 'Spring Boot', 'Redis', 'AWS ECS'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-3',
    year: '2023',
    period: '2023.05 – 2023.08 · 4개월',
    title: '데이터 수집 파이프라인 재구축',
    role: '단독 개발',
    summary: '매일 흩어진 소스 20여 곳의 데이터를 모으는 배치를 관리 가능한 구조로 옮겼습니다.',
    detail: '크론과 수동 스크립트로 운영되던 수집 작업을 워크플로 엔진으로 이관했습니다. 소스별 어댑터를 규격화해 새 소스 추가를 반나절 작업으로 줄였고, 실패한 작업만 선택적으로 재실행할 수 있도록 했습니다.',
    results: ['야간 배치 실패 대응 시간 평균 3시간 → 20분', '신규 소스 연동 리드타임 5일 → 0.5일', '저장 비용 30% 절감'],
    stack: ['Python', 'Airflow', 'S3', 'Terraform'],
    repo: '', live: '', docs: []
  },
  {
    slotId: 'work-4',
    year: '2022',
    period: '2022.03 – 2022.11 · 9개월',
    title: '사내 운영 어드민 개편',
    role: '풀스택 개발',
    summary: 'CS·물류팀이 매일 쓰는 어드민을 권한 모델부터 다시 설계했습니다.',
    detail: '팀별로 흩어진 6개 도구를 하나의 어드민으로 통합하고, 역할 기반 권한과 감사 로그를 도입했습니다. 자주 쓰는 조회 화면은 서버 사이드 페이징과 저장 필터로 다시 만들었습니다.',
    results: ['주문 처리 화면 평균 조작 단계 9 → 4', '권한 관련 수동 요청 주 30건 → 2건', '전 작업 감사 로그 확보'],
    stack: ['TypeScript', 'React', 'Spring Boot', 'MySQL'],
    repo: '', live: '', docs: []
  }
];

const PROJECTS = [
  {
    slotId: 'proj-1',
    year: '2026',
    period: '2026.04 – 2026.06 · 3개월',
    title: '가계부 API 서버 (연습)',
    role: '개인 연습 · 단독',
    kind: '연습 프로젝트',
    summary: '지출 기록과 월별 통계를 다루는 REST API를 처음부터 설계해 본 연습 프로젝트입니다.',
    detail: '실무에서 자주 마주치는 도메인을 골라 요구사항 정의부터 스스로 해봤습니다. 카테고리·반복 지출·예산 초과 알림까지 범위를 정하고, 엔티티 설계와 트랜잭션 경계를 여러 번 고쳐가며 정리했습니다. 테스트는 통합 테스트 중심으로 작성했습니다.',
    results: ['도메인 모델 3회 리팩터링 기록을 문서로 남김', '통합 테스트 62개 · 커버리지 81%', 'GitHub Actions로 PR마다 테스트 자동 실행'],
    stack: ['Kotlin', 'Spring Boot', 'PostgreSQL', 'JUnit5'],
    repo: 'https://github.com/jiwonkim/budget-api',
    live: 'https://budget-api.example.dev/swagger',
    docs: [
      { label: '요구사항 정의서', href: '#' },
      { label: 'ERD · API 명세', href: '#' },
      { label: '회고 노트', href: '#' }
    ]
  },
  {
    slotId: 'proj-2',
    year: '2026',
    period: '2026.01 – 2026.03 · 3개월',
    title: '실시간 채팅 서버 (연습)',
    role: '개인 연습 · 단독',
    kind: '연습 프로젝트',
    summary: 'WebSocket과 메시지 브로커를 직접 다뤄 보기 위해 만든 소규모 채팅 서버입니다.',
    detail: '다중 서버 환경에서 메시지가 유실되지 않는지 확인하는 것이 목표였습니다. 세션을 Redis에 두고 발행·구독으로 서버 간 브로드캐스트를 붙였습니다. 재접속 시 미수신 메시지를 되돌려주는 커서 방식도 실험했습니다.',
    results: ['서버 2대 환경에서 메시지 유실 0건 확인', '동시 접속 500 커넥션 부하 테스트 통과', '재접속 시 미수신 메시지 복구 구현'],
    stack: ['Java', 'Spring WebSocket', 'Redis Pub/Sub', 'Docker'],
    repo: 'https://github.com/jiwonkim/chat-lab',
    live: 'https://chat-lab.example.dev',
    docs: [
      { label: '요구사항 정의서', href: '#' },
      { label: '아키텍처 문서', href: '#' },
      { label: '부하 테스트 결과', href: '#' }
    ]
  },
  {
    slotId: 'proj-3',
    year: '2025',
    period: '2025.09 – 2025.11 · 3개월',
    title: '채용 공고 수집 크롤러 (연습)',
    role: '개인 연습 · 단독',
    kind: '연습 프로젝트',
    summary: '여러 채용 사이트의 공고를 모아 조건에 맞는 것만 알려주는 배치 파이프라인 연습입니다.',
    detail: '수집·정제·알림 세 단계를 나누고 스케줄러로 묶었습니다. 사이트별 파서를 어댑터로 분리해 새 사이트 추가 비용을 줄이는 구조를 연습했고, 중복 공고 판정 로직을 여러 방식으로 비교해 봤습니다.',
    results: ['사이트 5곳 수집 · 신규 사이트 추가 1시간 내', '중복 공고 판정 정확도 96%', '매일 오전 슬랙으로 요약 알림 발송'],
    stack: ['Python', 'Airflow', 'SQLite', 'Slack API'],
    repo: 'https://github.com/jiwonkim/job-crawler',
    live: '',
    docs: [
      { label: '요구사항 정의서', href: '#' },
      { label: '파서 설계 메모', href: '#' }
    ]
  },
  {
    slotId: 'proj-4',
    year: '2025',
    period: '2025.06 – 2025.08 · 3개월',
    title: '할 일 관리 웹앱 (연습)',
    role: '개인 연습 · 단독',
    kind: '연습 프로젝트',
    summary: '프론트엔드 감각을 익히기 위해 백엔드부터 화면까지 혼자 만들어 본 작은 웹앱입니다.',
    detail: '인증, 낙관적 업데이트, 오프라인 임시 저장까지 직접 붙여봤습니다. 화면 상태와 서버 상태를 분리하는 방법을 연습하는 데 초점을 맞췄고, 배포는 컨테이너 이미지로 자동화했습니다.',
    results: ['로그인·할 일 CRUD·태그 필터 구현', '오프라인 입력 후 재접속 시 자동 동기화', '커밋마다 자동 빌드·배포 파이프라인 구성'],
    stack: ['TypeScript', 'React', 'Spring Boot', 'MySQL'],
    repo: 'https://github.com/jiwonkim/todo-practice',
    live: 'https://todo-practice.example.dev',
    docs: [
      { label: '요구사항 정의서', href: '#' },
      { label: '화면 설계서', href: '#' }
    ]
  }
];

const JOBS = [
  {
    period: '2023 – 현재',
    role: '시니어 백엔드 엔지니어',
    company: '페이먼트랩 (핀테크 · 30명)',
    points: [
      '구독 결제 도메인을 분리 설계하고 정산 시스템 전체를 재구축했습니다.',
      '주니어 3명의 코드 리뷰와 온보딩을 담당하며 리뷰 응답 기준을 세웠습니다.',
      '장애 대응 프로세스를 문서화해 평균 복구 시간을 절반으로 줄였습니다.'
    ]
  },
  {
    period: '2020 – 2023',
    role: '백엔드 엔지니어',
    company: '커머스브릿지 (이커머스 SaaS)',
    points: [
      '재고·주문 API를 담당하며 월 500만 요청 규모의 트래픽을 운영했습니다.',
      '데이터 수집 파이프라인을 워크플로 엔진으로 이관해 운영 부담을 줄였습니다.',
      '사내 운영 어드민을 풀스택으로 개편했습니다.'
    ]
  },
  {
    period: '2018 – 2020',
    role: '소프트웨어 엔지니어',
    company: '노드스튜디오 (수탁 개발)',
    points: [
      '클라이언트 12곳의 웹 서비스 백엔드를 구축하고 인수인계했습니다.',
      '반복되는 초기 설정을 사내 스캐폴딩으로 정리해 착수 기간을 단축했습니다.'
    ]
  }
];
