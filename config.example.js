// config.example.js 를 복사해서 config.js 로 저장 후 아래 값을 채워주세요
const CONFIG = {
  OPENAI_KEY: 'YOUR_OPENAI_API_KEY_HERE',

  // 구글 스프레드시트 설정:
  // 1. 스프레드시트 열기
  // 2. 파일 → 공유 → 웹에 게시 → CSV 형식으로 게시
  // 3. 아래 YOUR_SHEET_ID 부분을 본인 시트 ID로 교체
  //    (주소창 .../spreadsheets/d/{이부분}/edit)
  SHEET_URL: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv&gid=0',
};
