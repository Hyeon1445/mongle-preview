# mongle-preview

mongle-ui 컴포넌트 라이브러리의 조화를 검증하기 위한 쇼케이스 앱.

## 로컬 실행

```bash
pnpm install
pnpm dev
```

---

## 쇼케이스 페이지

### 1. 팀 대시보드 (Team Dashboard)

팀 현황을 한눈에 보여주는 대시보드.

**사용 컴포넌트**
- `Grid` — 통계 카드 4개, 팀원 카드 그리드 배치
- `Card` / `CardHeader` / `CardContent` / `CardFooter` — 통계·팀원·활동 카드
- `Avatar` / `AvatarGroup` — 팀원 프로필
- `Badge` — 역할(Dev/Design/PM/QA), 온라인 상태
- `Icon` — 활동 피드 아이콘 (GitPullRequest, CheckCircle, MessageSquare 등)
- `Divider` — 활동 피드 구분선
- `Typography` — 헤딩, 수치, 설명 텍스트
- `Stack` — 활동 피드 수직 레이아웃
- `Button` — 상세보기, 팀원 초대

---

### 2. 소셜 피드 (Social Feed)

팀 내 소통 피드. 스토리 바 + 게시물 카드 + 추천 팔로우 사이드바.

**사용 컴포넌트**
- `Avatar` / `AvatarGroup` — 스토리 바, 게시물 작성자
- `Card` / `CardHeader` / `CardContent` / `CardFooter` — 게시물 카드, 추천 유저 카드
- `Badge` — 직군 태그(Dev/Design/PM), 새 알림 표시
- `Button` — 좋아요, 댓글, 공유, 팔로우
- `IconButton` — 좋아요(Heart), 댓글(MessageCircle), 공유(Share2), 북마크(Bookmark)
- `Icon` — 각종 액션 아이콘
- `Divider` — 섹션 구분
- `Typography` — 본문, 작성자명, 시간
- `Stack` / `Grid` — 레이아웃

---

### 3. 프로필 설정 (Profile Settings)

계정 정보 입력·수정 중심의 설정 페이지. 프로필 / 알림 / 보안 탭으로 구성.

**사용 컴포넌트**
- `TextField` — 이름, 이메일, 직책, 소개, 웹사이트 (label, description, error, leftElement)
- `PasswordField` — 현재/새/확인 비밀번호 (description, error)
- `NumberField` — 경력 입력 (min, max, step)
- `Avatar` / `AvatarGroup` — 프로필 사진, 팀원 목록
- `Badge` — 역할, 온라인 상태, 알림 카운트, 보안 현황
- `Card` — elevated(기본 정보), outlined(추가 정보·보안 현황)
- `ProgressBar` — 이번 달 알림 유형별 현황
- `Button` — 탭 전환(soft/ghost), 저장·취소, 알림 on/off 토글
- `Transition` — 저장 완료 메시지 fade in/out
- `Paper` — 탭 네비게이션 컨테이너
- `Skeleton` — 프로필 카드 로딩 상태
- `Divider` — 알림 항목·보안 현황 구분선
- `Stack` / `Icon` / `Typography` — 전체 레이아웃

---

### 4. 칸반 보드 (Kanban Board)

프로젝트 태스크 관리 보드. 4개 상태 컬럼에 태스크 카드.

**사용 컴포넌트**
- `Card` / `CardHeader` / `CardContent` — 태스크 카드
- `Badge` — 우선순위(긴급/보통/낮음), 진행 상태
- `Avatar` — 담당자 프로필
- `IconButton` — 태스크 액션 (편집, 삭제, 첨부)
- `Icon` — 상태 아이콘, 태그 아이콘
- `Button` — 필터 탭, 태스크 추가
- `Typography` — 태스크 제목, 설명, 메타 정보
- `Stack` / `Grid` — 컬럼 레이아웃
- `Divider` — 컬럼 헤더 구분
- `Paper` — 컬럼 배경

---

### 4. 이커머스 상품 목록 (Product Catalog)

상품 카드 그리드 + 카테고리 사이드바 + 필터 탭.

**사용 컴포넌트**
- `Card` / `CardHeader` / `CardContent` / `CardFooter` — 상품 카드
- `Badge` — 신상품, 세일, 품절, 인기 태그
- `Button` — 필터 탭, 담기, 좋아요
- `IconButton` — 위시리스트(Heart), 검색(Search)
- `Icon` — 카테고리 아이콘, 별점 아이콘
- `Typography` — 상품명, 가격, 설명
- `Stack` / `Grid` — 사이드바 + 그리드 레이아웃
- `Divider` — 카테고리 섹션 구분
- `Paper` — 필터 사이드바 배경
- `Avatar` — 셀러 프로필 (소형)

---

## 컴포넌트 라이브러리

- **라이브러리**: [mongle-ui Storybook](https://hyeon1445.github.io/mongle-ui)
- **버전**: 0.2.3
- **스택**: React 19 + TypeScript + TailwindCSS v4
