# ✏️ 5학년 2반 학생 관리 시스템

초등학교 담임교사를 위한 학생 관리 웹 애플리케이션입니다.  
별도 서버나 데이터베이스 없이 로컬에서 바로 실행됩니다.

---

## 주요 기능

- **대시보드** — 출석률, 누가 기록 건수, 공지 사항 한눈에 확인
- **학생 목록** — 18명 학생 카드 보기, 이름/번호 검색, 학생 상세 정보 및 메모
- **출석 관리** — 월별 출결 현황표, 셀 클릭으로 출석·결석·조퇴·병가 순환 입력
- **누가 기록** — 학생별 관찰·상담·칭찬 기록 누적 관리
- **AI 기록 작성** — 키워드 선택 + 한 줄 메모 입력 → GPT-4.1 mini가 전문적인 상담 기록 자동 생성
- **CSV 연동** — `students.csv`, `records.csv` 파일과 자동 동기화

---

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/hanvelykim-ai/classlist.git
cd classlist
```

### 2. API 키 설정

```bash
cp config.example.js config.js
```

`config.js` 파일을 열고 OpenAI API 키를 입력합니다.

```javascript
const CONFIG = {
  OPENAI_KEY: 'sk-...'   // 본인의 API 키 입력
};
```

### 3. 실행

**`시작.bat` 더블클릭** (Node.js 또는 Python 필요)

브라우저가 자동으로 열리며 `http://localhost:8080` 에서 실행됩니다.

> ⚠️ `index.html`을 직접 열면 CSV 자동 연동이 작동하지 않습니다. 반드시 `시작.bat`으로 실행하세요.

---

## 파일 구조

```
classlist/
├── index.html          # 앱 셸
├── style.css           # 스타일
├── app.js              # 앱 로직
├── server.js           # 로컬 HTTP 서버
├── 시작.bat            # 실행 스크립트
├── students.csv        # 학생 정보 (편집 가능)
├── records.csv         # 누가 기록 (자동 저장)
├── config.js           # API 키 (gitignore — 직접 생성 필요)
└── config.example.js   # API 키 설정 예시
```

---

## CSV 편집 방법

| 파일 | 용도 | 컬럼 |
|------|------|------|
| `students.csv` | 학생 기본 정보 | 번호, 이름, 성별, 생년월일, 혈액형, 보호자연락처, 주소, 특기사항 |
| `records.csv` | 누가 기록 | 번호, 이름, 날짜, 유형, 내용 |

- **메모장보다 VS Code 사용 권장** (인코딩 안전)
- Excel로 저장 시 EUC-KR로 바뀔 수 있으니 주의
- 수정 후 브라우저에서 **F5** 새로고침하면 바로 반영

---

## 요구 사항

- [Node.js](https://nodejs.org) 또는 Python 3 (로컬 서버 실행용)
- OpenAI API 키 (AI 기록 작성 기능 사용 시)
- 최신 브라우저 (Chrome, Edge, Firefox)
