<<<<<<< HEAD
# YTM Scheduler

YouTube Music 웹 플레이어(`music.youtube.com`)를 시간 기반으로 자동 제어하는 Chrome Extension (Manifest V3).

## 주요 기능

- **슬립 타이머** — 15/30/60/120분 프리셋 또는 1~480분 커스텀, 종료 30초 전 볼륨 페이드아웃, 확장 아이콘 배지에 남은 시간 표시
- **알람 재생** — HH:MM + 요일 반복 지정, 최대 5개, YouTube Music 탭 자동 생성 후 셔플/볼륨 설정 및 재생 시작
- **플레이리스트 관리** — 최대 20개 저장, 별명 + URL 쌍, 라이브러리에서 가져오기(DOM 파싱)
- **브라우저 재시작 복원** — `chrome.storage.local` + `chrome.alarms`로 영속화, SW 재기동 시 자동 재등록

## 설치

1. Chrome에서 `chrome://extensions/` 접속
2. 우측 상단 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램을 로드합니다** 클릭
4. 이 `ytm-scheduler/` 폴더 선택

## 사용법

### 슬립 타이머
1. 툴바의 확장 아이콘 클릭 → **😴 슬립** 탭
2. 시간 프리셋 또는 커스텀 선택 → **🌙 타이머 시작**
3. 배지에 남은 분/시간 표시, 재생 중인 YTM 탭이 종료 시점에 자동 정지됨

### 알람
1. **⏰ 알람** 탭 → **+ 새 알람 추가**
2. 시각, 요일(매일/평일/주말/개별), 플레이리스트, 셔플, 시작 볼륨 설정 → 저장
3. 알람 시각 도달 시 YTM 탭 자동 탐색 (없으면 신규 생성)하여 재생
4. 카드의 토글로 ON/OFF, 수정/삭제 가능

### 플레이리스트
1. **🎶 플레이리스트** 탭
2. **URL로 추가**: `music.youtube.com/playlist?list=...` URL + 별명 입력
3. **라이브러리에서 가져오기**: 열려 있는 YouTube Music 탭에서 보이는 플레이리스트들을 스캔하여 개별 추가

## 스크린샷

> TODO: 팝업 UI 캡처 추가 (sleep / alarm / playlist 각 탭)

## 계정 로그인

본 확장은 **사용자 브라우저 세션을 그대로 사용**합니다. 별도의 로그인 설정은 없고, 아래 순서로 진행하세요:

1. 팝업 우측 상단 **"열기"** 버튼 클릭 → `music.youtube.com` 탭이 열리거나 활성화됩니다.
2. 해당 탭에서 Google 계정으로 로그인하세요.
3. 로그인 후 팝업을 다시 열면 상단에 **"● 연결됨"** 표시됩니다.
4. 이 상태에서 **라이브러리에서 가져오기**가 정상 동작합니다(내부적으로 `/library/playlists`로 이동하여 파싱).

> Chrome 보안 정책상 확장이 Google 로그인 플로우를 프로그램적으로 수행할 수 없습니다. 사용자가 탭에서 직접 로그인해야 합니다.

## 알려진 제한사항

- **브라우저가 꺼져 있으면 동작하지 않음** — Chrome Extension은 브라우저 프로세스가 실행 중일 때만 작동
- **DOM 셀렉터 변경 가능성** — YouTube Music의 DOM 구조 업데이트 시 재생 제어가 실패할 수 있음. 셀렉터는 `utils/constants.js`의 `YTM_SELECTORS`에 분리되어 있어 수동 업데이트 가능
- **라이브러리 가져오기 제약** — `a[href*="playlist?list="]` 패턴 의존. 특정 페이지(홈, 라이브러리) 뷰에서 실행해야 결과가 나옴
- **탭 여러 개일 때** — 첫 번째로 발견된 YTM 탭만 제어 대상
- **Service Worker 제약 (MV3)** — SW는 비활성화될 수 있으나 `chrome.alarms`가 깨우므로 스케줄은 유지됨. 전역 변수 대신 `chrome.storage.local`로 상태 관리

## 파일 구조

```
ytm-scheduler/
├── manifest.json
├── background/service-worker.js   # 알람/타이머 스케줄
├── content/content-script.js      # YTM DOM 제어
├── popup/                         # 팝업 UI
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── utils/constants.js             # 메시지 타입/셀렉터/상수
└── icons/                         # 16/48/128 PNG
```

## 향후 개선 (v2)

- 알람 시 시작 볼륨까지 점진 증가 (0 → 목표)
- 통계 대시보드 (일별 청취 시간)
- 다중 프로필 (아침용/수면용/집중용 프리셋)
- MCP Server 래핑 — 자연어로 제어
=======
