(function () {
  'use strict';

  // ─────────────────────────────────────────
  // STATIC DATA
  // ─────────────────────────────────────────
  const OPENAI_KEY = (typeof CONFIG !== 'undefined' && CONFIG.OPENAI_KEY) || '';
  const AI_KEYWORDS = [
    '학습 부진', '수업 태도 불량', '숙제 미제출',
    '또래 관계 문제', '학교폭력 예방', '정서·심리 지원',
    '보호자 면담', '가정 환경', '출결 지도',
    '칭찬·격려', '모범 행동', '리더십 발휘',
  ];

  let STUDENTS = [
    {
      id: 1, number: '01', name: '박민준', gender: 'male',
      birth: '2014-03-12', blood: 'A', guardian: '010-2345-6789',
      address: '서울시 강남구 역삼동 123-4 현대아파트 101동 501호',
      grades: { 국어: '수', 수학: '우', 영어: '미', 사회: '수', 과학: '우' },
      notes: '수학 올림피아드 참가 경험 있음. 발표력이 뛰어나고 리더십이 있음.'
    },
    {
      id: 2, number: '02', name: '이도윤', gender: 'male',
      birth: '2014-07-24', blood: 'O', guardian: '010-3456-7890',
      address: '서울시 서초구 방배동 456-7 래미안아파트 203동 1202호',
      grades: { 국어: '우', 수학: '수', 영어: '수', 사회: '미', 과학: '수' },
      notes: '영어 회화 능력 우수. 독서를 즐기며 어휘력이 풍부함.'
    },
    {
      id: 3, number: '03', name: '박서준', gender: 'male',
      birth: '2014-01-08', blood: 'B', guardian: '010-4567-8901',
      address: '서울시 마포구 합정동 789-1 마포푸르지오 304동 703호',
      grades: { 국어: '미', 수학: '미', 영어: '양', 사회: '우', 과학: '미' },
      notes: '체육 활동에 적극적. 친구들과 협력을 잘하며 명랑한 성격.'
    },
    {
      id: 4, number: '04', name: '최지호', gender: 'male',
      birth: '2014-11-15', blood: 'AB', guardian: '010-5678-9012',
      address: '서울시 송파구 잠실동 101-5 엘스아파트 206동 1501호',
      grades: { 국어: '수', 수학: '수', 영어: '수', 사회: '수', 과학: '수' },
      notes: '전과목 우수. 학급 부반장. 성실하고 책임감이 강함.'
    },
    {
      id: 5, number: '05', name: '정현우', gender: 'male',
      birth: '2014-05-30', blood: 'A', guardian: '010-6789-0123',
      address: '서울시 노원구 중계동 202-8 중계주공아파트 3단지 407호',
      grades: { 국어: '양', 수학: '우', 영어: '미', 사회: '미', 과학: '우' },
      notes: '수학 응용력이 뛰어남. 과학 실험에 흥미가 많음.'
    },
    {
      id: 6, number: '06', name: '강지훈', gender: 'male',
      birth: '2014-09-02', blood: 'O', guardian: '010-7890-1234',
      address: '서울시 영등포구 여의도동 33-5 시범아파트 나동 802호',
      grades: { 국어: '미', 수학: '양', 영어: '미', 사회: '양', 과학: '미' },
      notes: '그림 그리기를 좋아함. 미술 대회 입상 경험. 예술적 감각이 뛰어남.'
    },
    {
      id: 7, number: '07', name: '윤시우', gender: 'male',
      birth: '2014-02-19', blood: 'B', guardian: '010-8901-2345',
      address: '경기도 과천시 별양동 14-2 주공아파트 5단지 309호',
      grades: { 국어: '우', 수학: '미', 영어: '우', 사회: '수', 과학: '우' },
      notes: '사회 과목에 관심이 많고 시사 뉴스를 즐겨 봄. 발표 시간에 적극적.'
    },
    {
      id: 8, number: '08', name: '임준서', gender: 'male',
      birth: '2014-06-11', blood: 'A', guardian: '010-9012-3456',
      address: '서울시 동작구 상도동 55-9 e편한세상 102동 602호',
      grades: { 국어: '미', 수학: '가', 영어: '양', 사회: '미', 과학: '양' },
      notes: '수학 기초 보충 지도 필요. 음악 활동에 재능 있음. 학교 오케스트라 참여 중.'
    },
    {
      id: 9, number: '09', name: '오태양', gender: 'male',
      birth: '2014-12-03', blood: 'O', guardian: '010-0123-4567',
      address: '서울시 성북구 길음동 77-3 길음뉴타운 8단지 1103호',
      grades: { 국어: '우', 수학: '우', 영어: '미', 사회: '우', 과학: '미' },
      notes: '독서 습관이 훌륭함. 학급 도서 담당. 매주 도서관 이용 습관화.'
    },
    {
      id: 10, number: '10', name: '김서아', gender: 'female',
      birth: '2014-04-17', blood: 'A', guardian: '010-1234-5678',
      address: '서울시 강동구 천호동 88-2 롯데캐슬 202동 901호',
      grades: { 국어: '수', 수학: '수', 영어: '수', 사회: '수', 과학: '미' },
      notes: '학급 반장. 리더십이 뛰어나고 모든 과목 성실히 임함. 친구들에게 인기가 많음.'
    },
    {
      id: 11, number: '11', name: '이하은', gender: 'female',
      birth: '2014-08-22', blood: 'B', guardian: '010-2345-6780',
      address: '서울시 구로구 개봉동 99-4 개봉e편한세상 401동 307호',
      grades: { 국어: '수', 수학: '미', 영어: '수', 사회: '우', 과학: '우' },
      notes: '글쓰기 대회 수상 경험. 언어 능력이 탁월하고 독창적인 글을 씀.'
    },
    {
      id: 12, number: '12', name: '박지유', gender: 'female',
      birth: '2014-10-05', blood: 'O', guardian: '010-3456-7891',
      address: '서울시 중랑구 묵동 123-6 묵동현대아파트 2동 1004호',
      grades: { 국어: '우', 수학: '우', 영어: '우', 사회: '미', 과학: '수' },
      notes: '과학 탐구 보고서 작성 능력 우수. 관찰력이 세밀하고 분석적 사고가 뛰어남.'
    },
    {
      id: 13, number: '13', name: '최수아', gender: 'female',
      birth: '2014-01-28', blood: 'AB', guardian: '010-4567-8902',
      address: '경기도 성남시 분당구 정자동 221-7 파크뷰아파트 507호',
      grades: { 국어: '미', 수학: '수', 영어: '우', 사회: '미', 과학: '수' },
      notes: '수학·과학 계열 특기. 코딩 교육 수강 중. 논리적 사고력이 매우 우수함.'
    },
    {
      id: 14, number: '14', name: '정나은', gender: 'female',
      birth: '2014-03-14', blood: 'A', guardian: '010-5678-9013',
      address: '서울시 강서구 방화동 44-1 강서힐스테이트 103동 805호',
      grades: { 국어: '우', 수학: '미', 영어: '미', 사회: '우', 과학: '우' },
      notes: '음악(바이올린) 특기. 예술적 감각이 풍부하고 감수성이 예민함.'
    },
    {
      id: 15, number: '15', name: '한소율', gender: 'female',
      birth: '2014-07-09', blood: 'O', guardian: '010-6789-0124',
      address: '서울시 광진구 화양동 55-8 화양자이아파트 201동 1201호',
      grades: { 국어: '미', 수학: '양', 영어: '미', 사회: '양', 과학: '미' },
      notes: '체육 활동 적극 참여. 기초 학습 보충 지도 필요. 밝고 긍정적인 성격.'
    },
    {
      id: 16, number: '16', name: '신예린', gender: 'female',
      birth: '2014-11-27', blood: 'B', guardian: '010-7890-1235',
      address: '서울시 은평구 응암동 66-3 응암롯데캐슬 304동 702호',
      grades: { 국어: '수', 수학: '우', 영어: '수', 사회: '수', 과학: '우' },
      notes: '발표력이 뛰어나고 친화력이 좋음. 학급 회의 진행 담당. 자기 주도 학습 우수.'
    },
    {
      id: 17, number: '17', name: '조민서', gender: 'female',
      birth: '2014-02-14', blood: 'A', guardian: '010-8901-2346',
      address: '서울시 서대문구 홍제동 77-5 홍제힐스테이트 102동 301호',
      grades: { 국어: '우', 수학: '미', 영어: '우', 사회: '우', 과학: '미' },
      notes: '역사 및 사회 과목에 관심이 높음. 박물관 탐방 동아리 소속.'
    },
    {
      id: 18, number: '18', name: '황지원', gender: 'female',
      birth: '2014-09-18', blood: 'O', guardian: '010-9012-3457',
      address: '경기도 고양시 일산동구 마두동 88-2 강촌마을 2단지 603호',
      grades: { 국어: '양', 수학: '가', 영어: '양', 사회: '미', 과학: '양' },
      notes: '수학 집중 보충 지도 실시 중. 미술·공예 분야 재능이 매우 뛰어남.'
    },
  ];

  const ANNOUNCEMENTS = [
    { id: 1, text: '5월 20일(수) 소풍 동의서 및 참가비 제출 마감', date: '2026-05-14', type: 'urgent' },
    { id: 2, text: '학부모 상담주간: 5월 26일(화)~30일(토) — 신청 링크 전달 완료', date: '2026-05-13', type: 'info' },
    { id: 3, text: '2학기 방과후 수업 신청 기간: 6월 2일(화)~13일(토)', date: '2026-05-12', type: 'info' },
  ];

  const ATTENDANCE_CYCLE = ['출석', '결석', '조퇴', '병가'];
  const ATTENDANCE_CLS   = { '출석': 'att-present', '결석': 'att-absent', '조퇴': 'att-early', '병가': 'att-sick' };

  const CAT_CLASS = { '학습': 'cat-study', '생활/태도': 'cat-life', '칭찬': 'cat-praise', '특이사항': 'cat-special', '상담': 'cat-counsel' };

  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const state = {
    className: '5학년 2반',
    section: 'dashboard',
    month: new Date(),
    attendance: {},              // { id: { 'YYYY-MM-DD': status } }
    memos: {},                   // { id: string }
    records: {},                 // { id: [ { id, date, cat, content } ] }
    csvConnected: false,
    recSid: 1,                   // selected student in records view
    recKeywords: [],             // AI 작성용 선택 키워드
    recMemo: '',                 // AI 작성용 한 줄 메모
    query: '',
    detailId: null,
  };

  // ─────────────────────────────────────────
  // LOCAL STORAGE
  // ─────────────────────────────────────────
  const KEYS = { att: 'klsm_att', memos: 'klsm_memos', rec: 'klsm_rec', cls: 'klsm_cls' };

  function loadStorage() {
    try {
      const a  = localStorage.getItem(KEYS.att);  if (a)  state.attendance = JSON.parse(a);
      const m  = localStorage.getItem(KEYS.memos); if (m)  state.memos     = JSON.parse(m);
      const r  = localStorage.getItem(KEYS.rec);  if (r)  state.records   = JSON.parse(r);
      const cn = localStorage.getItem(KEYS.cls);  if (cn) state.className  = cn;
    } catch (_) {}
  }

  function saveAtt() {
    try { localStorage.setItem(KEYS.att, JSON.stringify(state.attendance)); } catch (_) {}
  }

  function saveMemos() {
    try { localStorage.setItem(KEYS.memos, JSON.stringify(state.memos)); } catch (_) {}
  }

  function saveRec() {
    try { localStorage.setItem(KEYS.rec, JSON.stringify(state.records)); } catch (_) {}
  }

  function saveClassName() {
    try { localStorage.setItem(KEYS.cls, state.className); } catch (_) {}
  }

  // ─────────────────────────────────────────
  // DEMO DATA — pre-fill attendance for May 1–15
  // ─────────────────────────────────────────
  function initDemoAttendance() {
    if (Object.keys(state.attendance).length > 0) return; // already has data

    const workdays = [];
    for (let d = 1; d <= 15; d++) {
      const date = new Date(2026, 4, d);
      const dow = date.getDay();
      if (dow !== 0 && dow !== 6) workdays.push(dk(date));
    }

    STUDENTS.forEach(s => {
      state.attendance[s.id] = {};
      workdays.forEach(day => { state.attendance[s.id][day] = '출석'; });
    });

    // Realistic exceptions
    ['2026-05-08', '2026-05-12'].forEach(d => { state.attendance[8][d]  = '결석'; });
    ['2026-05-06', '2026-05-07'].forEach(d => { state.attendance[15][d] = '병가'; });
    state.attendance[3][  '2026-05-13'] = '조퇴';
    state.attendance[18][ '2026-05-02'] = '결석';
    state.attendance[5][  '2026-05-15'] = '조퇴';

    saveAtt();
  }

  // ─────────────────────────────────────────
  // DEMO DATA — 누가 기록
  // ─────────────────────────────────────────
  function initDemoRecords() {
    if (Object.keys(state.records).length > 0) return;

    const demo = [
      { sid: 1,  date: '2026-05-12', cat: '칭찬',    content: '수학 시간 발표가 매우 훌륭했음. 복잡한 문제를 친구들이 이해하기 쉽게 설명함.' },
      { sid: 1,  date: '2026-05-07', cat: '학습',    content: '독서 퀴즈 만점. 이달의 독서왕으로 선정.' },
      { sid: 4,  date: '2026-05-14', cat: '생활/태도', content: '부반장으로서 급식 지도 역할을 성실히 수행함. 모범적인 태도.' },
      { sid: 8,  date: '2026-05-13', cat: '특이사항', content: '수학 숙제 3회 연속 미제출. 보호자(어머니) 전화 상담 완료. 5월 중 방과후 보충 학습 실시 예정.' },
      { sid: 8,  date: '2026-05-08', cat: '특이사항', content: '무단 결석. 보호자에게 연락하여 가정 사정으로 확인. 출결 처리 완료.' },
      { sid: 10, date: '2026-05-13', cat: '칭찬',    content: '반장으로서 학급 회의를 주도적으로 진행함. 친구들 의견을 고르게 수렴하는 능력 탁월.' },
      { sid: 11, date: '2026-05-09', cat: '칭찬',    content: '교내 글쓰기 대회 최우수상 수상. 학교 대표로 시 대회 참가 예정.' },
      { sid: 15, date: '2026-05-12', cat: '상담',    content: '학습 부진 관련 개별 상담 실시. 방과후 보충 수업 신청 권유. 학부모 연락 및 동의 필요.' },
      { sid: 15, date: '2026-05-07', cat: '특이사항', content: '독감으로 5/6~5/7 이틀 결석. 병가 처리 완료. 복귀 후 학습 내용 보충 지도.' },
      { sid: 13, date: '2026-05-11', cat: '학습',    content: '코딩 수업에서 우수한 결과물 제출. 알고리즘 개념을 빠르게 습득하고 응용력이 뛰어남.' },
      { sid: 3,  date: '2026-05-13', cat: '특이사항', content: '치과 진료로 오후 2시 조퇴. 보호자 동행 확인 완료.' },
      { sid: 18, date: '2026-05-02', cat: '특이사항', content: '결석 (가정 사정). 보호자 연락 확인 완료.' },
      { sid: 6,  date: '2026-05-08', cat: '칭찬',    content: '미술 시간에 창의적인 작품 완성. 급우들의 큰 호응을 받음.' },
    ];

    let idSeed = 1000;
    demo.forEach(r => {
      if (!state.records[r.sid]) state.records[r.sid] = [];
      state.records[r.sid].push({ id: idSeed++, date: r.date, cat: r.cat, content: r.content });
    });

    saveRec();
  }

  // ─────────────────────────────────────────
  // UTILITIES
  // ─────────────────────────────────────────
  function pad2(n) { return String(n).padStart(2, '0'); }

  function dk(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  }

  function dkToday() { return dk(new Date()); }

  function formatBirth(str) { return str.replace(/-/g, '.'); }

  function initials(name) { return name.length >= 2 ? name.slice(1) : name; }

  function isWeekend(date) { const d = date.getDay(); return d === 0 || d === 6; }

  function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─────────────────────────────────────────
  // CSV IMPORT
  // ─────────────────────────────────────────
  function parseCSVLine(line) {
    const result = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQ = !inQ; }
      else if (line[i] === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
      else { cur += line[i]; }
    }
    result.push(cur.trim());
    return result;
  }

  function csvToStudents(text) {
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return null;

    const header   = parseCSVLine(lines[0]);
    const notesCol = header.indexOf('특기사항'); // 성적 있으면 12, 없으면 7

    const students = [];
    for (let i = 1; i < lines.length; i++) {
      const c = parseCSVLine(lines[i]);
      if (c.length < 2 || !c[1]) continue;
      students.push({
        id:       i,
        number:   String(c[0]).padStart(2, '0'),
        name:     c[1],
        gender:   c[2] === '남' ? 'male' : 'female',
        birth:    c[3] || '',
        blood:    c[4] || '',
        guardian: c[5] || '',
        address:  c[6] || '',
        notes:    notesCol >= 0 ? (c[notesCol] || '') : (c[7] || ''),
      });
    }
    return students.length > 0 ? students : null;
  }

  async function loadCSVData() {
    try {
      const resp = await fetch('./students.csv');
      if (!resp.ok) return;
      const text   = await resp.text();
      const parsed = csvToStudents(text);
      if (parsed && parsed.length > 0) {
        STUDENTS.length = 0;
        parsed.forEach(s => STUDENTS.push(s));
        state.csvConnected = true;
      }
    } catch (_) {}
  }

  // ─────────────────────────────────────────
  // RECORDS CSV
  // ─────────────────────────────────────────
  function parseRecordsCSV(text) {
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 1) return null;

    const records = {};
    let idSeed = 2000;
    for (let i = 1; i < lines.length; i++) {
      const c = parseCSVLine(lines[i]);
      if (c.length < 5 || !c[0]) continue;
      const sid = parseInt(c[0]);
      if (!sid) continue;
      if (!records[sid]) records[sid] = [];
      records[sid].push({ id: idSeed++, date: c[2], cat: c[3], content: c[4] });
    }
    return records;
  }

  async function loadCSVRecords() {
    try {
      const resp = await fetch('./records.csv');
      if (!resp.ok) return false;
      const text = await resp.text();
      state.records = parseRecordsCSV(text) || {};
      return true;
    } catch (_) { return false; }
  }

  async function saveRecordsToCSV() {
    const rows = ['번호,이름,날짜,유형,내용'];
    STUDENTS.forEach(s => {
      (state.records[s.id] || [])
        .slice().sort((a, b) => a.date.localeCompare(b.date))
        .forEach(r => {
          const content = String(r.content).replace(/"/g, '""');
          rows.push(`${parseInt(s.number)},${s.name},${r.date},${r.cat},"${content}"`);
        });
    });
    await fetch('/save-records', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: rows.join('\r\n') + '\r\n',
    });
  }

  function saveRecords() {
    saveRec();
    saveRecordsToCSV().catch(() => {});
  }

  // ─────────────────────────────────────────
  // AI 기록 생성
  // ─────────────────────────────────────────
  async function generateRecord(studentName, category, keywords, memo) {
    const kwText   = keywords.length > 0 ? keywords.join(', ') : '일반 관찰';
    const memoLine = memo.trim() ? `\n교사 메모: ${memo.trim()}` : '';

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: `당신은 한국 초등학교 담임교사의 학생 생활기록 및 상담 기록 작성을 돕는 전문 보조 도구입니다.
작성 원칙:
- 교육부·교육청 지침에 맞는 전문적인 공문서 체 한국어
- 학부모가 읽을 때 담임교사의 세심한 관찰과 진심 어린 지도 의지가 느껴지는 문체
- 학생의 긍정적 성장 가능성을 전제로 한 교육적 시각 유지
- 구체적 관찰 사실, 지도 내용, 향후 계획을 자연스럽게 포함
- 150~250자 내외의 간결하고 완결된 문장
- 날짜·교사 서명 등 메타정보 제외, 기록 본문만 작성`,
          },
          {
            role: 'user',
            content: `학생: ${studentName} (초등학교 5학년 2반)\n기록 유형: ${category}\n상황 키워드: ${kwText}${memoLine}\n\n위 내용을 바탕으로 공식 학생 상담·관찰 기록문을 작성해주세요.`,
          },
        ],
        max_tokens: 400,
        temperature: 0.75,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err.error && err.error.message) || `API 오류 ${res.status}`);
    }
    const data = await res.json();
    return data.choices[0].message.content.trim();
  }

  function getStats() {
    const today = dkToday();
    let present = 0, recTotal = 0;
    STUDENTS.forEach(s => {
      if (state.attendance[s.id]?.[today] === '출석') present++;
      recTotal += (state.records[s.id] || []).length;
    });
    return { present, recTotal };
  }

  // ─────────────────────────────────────────
  // ROUTER
  // ─────────────────────────────────────────
  function navigate(section) {
    document.querySelectorAll('main > section').forEach(el => { el.hidden = true; });
    const target = document.getElementById('section-' + section);
    if (target) target.hidden = false;

    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === section);
    });

    state.section = section;
    history.replaceState(null, '', '#' + section);

    ({ dashboard: renderDashboard, students: renderStudents, attendance: renderAttendance, records: renderRecords })[section]?.();
  }

  // ─────────────────────────────────────────
  // RENDER — DASHBOARD
  // ─────────────────────────────────────────
  function renderDashboard() {
    const { present, recTotal } = getStats();
    const total    = STUDENTS.length;
    const males    = STUDENTS.filter(s => s.gender === 'male').length;
    const females  = total - males;
    const todayRate = total === 0 ? '—' : present === 0 ? '미기록' : `${Math.round(present / total * 100)}%`;
    const year     = new Date().getFullYear();

    document.getElementById('section-dashboard').innerHTML = `
      <div class="page-header">
        <h1 class="page-title">${esc(state.className)} 대시보드</h1>
        <p class="page-subtitle">${year}학년도 · 담임교사 관리 시스템</p>
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <span class="stat-icon">👨‍👩‍👧‍👦</span>
          <div class="stat-label">총 학생 수</div>
          <div class="stat-value">${total}<span class="stat-value-unit">명</span></div>
          <div class="stat-sub">남학생 ${males}명 · 여학생 ${females}명</div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">✅</span>
          <div class="stat-label">오늘 출석률</div>
          <div class="stat-value">${todayRate}</div>
          <div class="stat-sub">출석 ${present}명 / 전체 ${total}명</div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📋</span>
          <div class="stat-label">누가 기록 총 건수</div>
          <div class="stat-value">${recTotal}<span class="stat-value-unit">건</span></div>
          <div class="stat-sub">${total}명 학생 전체 누적</div>
        </div>
      </div>

      <div class="quick-actions">
        <div class="section-label">빠른 이동</div>
        <div class="quick-actions-row">
          <button class="btn-primary" data-nav="students">👤 학생 목록</button>
          <button class="btn-primary" data-nav="attendance">📅 출석 관리</button>
          <button class="btn-primary" data-nav="records">📋 누가 기록</button>
        </div>
      </div>

      <div class="announcements-section">
        <div class="section-label">공지 및 알림</div>
        <div class="announcement-list">
          ${ANNOUNCEMENTS.map(a => `
            <div class="announcement-item ${a.type}">
              <div class="announcement-dot"></div>
              <div class="announcement-text">${esc(a.text)}</div>
              <div class="announcement-date">${a.date.replace(/-/g, '.')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.nav));
    });
  }

  // ─────────────────────────────────────────
  // RENDER — STUDENTS
  // ─────────────────────────────────────────
  let searchTimer = null;

  function renderStudents() {
    const q = state.query.trim().toLowerCase();
    const list = STUDENTS.filter(s =>
      s.name.includes(q) || s.number.includes(q) || (!q)
    );

    document.getElementById('section-students').innerHTML = `
      <div class="page-header">
        <h1 class="page-title">학생 목록</h1>
        <p class="page-subtitle">${esc(state.className)} 전체 학생 현황</p>
      </div>
      ${state.csvConnected
        ? `<div class="csv-status connected">● students.csv 자동 연결됨</div>`
        : `<div class="csv-status">● CSV 미연결 — <strong>시작.bat</strong>으로 실행하면 자동 연결됩니다</div>`}
      <div class="toolbar">
        <input id="s-search" type="search" class="search-input"
          placeholder="이름 또는 번호로 검색..."
          value="${esc(state.query)}" autocomplete="off">
        <span class="count-badge">${list.length}명</span>
      </div>
      <div class="student-grid">
        ${list.length === 0
          ? `<div class="no-results">
               <span class="no-results-icon">🔍</span>
               <div>'${esc(state.query)}'에 해당하는 학생이 없습니다</div>
             </div>`
          : list.map(studentCard).join('')
        }
      </div>
    `;

    const inp = document.getElementById('s-search');
    if (inp) {
      inp.addEventListener('input', e => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          state.query = e.target.value;
          renderStudents();
          const ni = document.getElementById('s-search');
          if (ni) { ni.focus(); ni.setSelectionRange(ni.value.length, ni.value.length); }
        }, 200);
      });
    }

    document.querySelectorAll('.student-card').forEach(card => {
      card.addEventListener('click', () => openPanel(+card.dataset.id));
    });
  }

  function studentCard(s) {
    const recCount = (state.records[s.id] || []).length;
    const recLabel = recCount > 0
      ? `<div class="student-rec-count">📋 누가기록 ${recCount}건</div>`
      : `<div class="student-rec-count" style="color:var(--subtle)">📋 기록 없음</div>`;

    return `
      <div class="student-card" data-id="${s.id}">
        <div class="card-top">
          <span class="student-num">번호 ${s.number}</span>
          <span class="gender-badge ${s.gender === 'male' ? 'gender-male' : 'gender-female'}">${s.gender === 'male' ? '남' : '여'}</span>
        </div>
        <div class="student-avatar${s.gender === 'female' ? ' female' : ''}">${initials(s.name)}</div>
        <div class="student-name-lg">${esc(s.name)}</div>
        <div class="student-dob">🎂 ${formatBirth(s.birth)} &nbsp;·&nbsp; ${s.blood}형</div>
        ${recLabel}
      </div>
    `;
  }

  // ─────────────────────────────────────────
  // RENDER — ATTENDANCE
  // ─────────────────────────────────────────
  const DAY_KO = ['일', '월', '화', '수', '목', '금', '토'];

  function renderAttendance() {
    const year  = state.month.getFullYear();
    const month = state.month.getMonth();
    const label = `${year}년 ${month + 1}월`;
    const total = daysInMonth(year, month);

    const days = [];
    for (let d = 1; d <= total; d++) {
      const date = new Date(year, month, d);
      days.push({ d, date, wknd: isWeekend(date), key: dk(date) });
    }

    const thCells = days.map(day => `
      <th class="${day.wknd ? 'wknd' : ''}">
        ${day.d}<br><span style="font-size:10px;font-weight:400">${DAY_KO[day.date.getDay()]}</span>
      </th>
    `).join('');

    const rows = STUDENTS.map(s => {
      const cells = days.map(day => {
        if (day.wknd) return `<td class="wknd"><span class="att-cell no-click">—</span></td>`;
        const status = state.attendance[s.id]?.[day.key] || '';
        const cls    = ATTENDANCE_CLS[status] || 'att-empty';
        const lbl    = status || '·';
        return `<td><span class="att-cell ${cls}" data-sid="${s.id}" data-day="${day.key}">${lbl}</span></td>`;
      }).join('');
      return `<tr><td>${esc(s.name)}</td>${cells}</tr>`;
    }).join('');

    document.getElementById('section-attendance').innerHTML = `
      <div class="page-header">
        <h1 class="page-title">출석 관리</h1>
        <p class="page-subtitle">날짜 칸을 클릭하여 출석 상태를 변경하세요</p>
      </div>
      <div class="attendance-controls">
        <div class="month-nav">
          <button class="btn-icon" id="prev-mo">‹</button>
          <span class="month-label">${label}</span>
          <button class="btn-icon" id="next-mo">›</button>
        </div>
        <div class="att-legend">
          <span class="legend-chip att-present">출석</span>
          <span class="legend-chip att-absent">결석</span>
          <span class="legend-chip att-early">조퇴</span>
          <span class="legend-chip att-sick">병가</span>
          <span style="font-size:12px;color:var(--color-ash)">클릭 시 순환</span>
        </div>
      </div>
      <div class="att-table-wrap">
        <table class="att-table">
          <thead>
            <tr><th>이름</th>${thCells}</tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;

    document.getElementById('prev-mo').addEventListener('click', () => {
      state.month = new Date(year, month - 1, 1);
      renderAttendance();
    });
    document.getElementById('next-mo').addEventListener('click', () => {
      state.month = new Date(year, month + 1, 1);
      renderAttendance();
    });

    document.querySelectorAll('.att-cell[data-sid]').forEach(cell => {
      cell.addEventListener('click', () => cycleAtt(+cell.dataset.sid, cell.dataset.day, cell));
    });
  }

  function cycleAtt(sid, day, cell) {
    if (!state.attendance[sid]) state.attendance[sid] = {};
    const cur  = state.attendance[sid][day] || '';
    const idx  = ATTENDANCE_CYCLE.indexOf(cur);
    const next = idx === ATTENDANCE_CYCLE.length - 1 ? '' : ATTENDANCE_CYCLE[idx + 1];

    if (next === '') delete state.attendance[sid][day];
    else state.attendance[sid][day] = next;
    saveAtt();

    cell.className = `att-cell ${ATTENDANCE_CLS[next] || 'att-empty'}`;
    cell.textContent = next || '·';

    if (state.section === 'dashboard') renderDashboard();
  }

  // ─────────────────────────────────────────
  // RENDER — 누가 기록
  // ─────────────────────────────────────────
  function renderRecords() {
    const el = document.getElementById('section-records');

    const sidebarHtml = STUDENTS.map(s => {
      const cnt     = (state.records[s.id] || []).length;
      const isActive = s.id === state.recSid;
      return `
        <div class="rec-student-item ${isActive ? 'active' : ''}" data-rec-sid="${s.id}">
          <div class="avatar-sm${s.gender === 'female' ? ' female' : ''}">${initials(s.name)}</div>
          <div class="rec-stu-info">
            <div class="rec-stu-name">${esc(s.name)}</div>
            <div class="rec-stu-sub">${s.number}번</div>
          </div>
          ${cnt > 0 ? `<span class="rec-cnt-badge">${cnt}</span>` : ''}
        </div>
      `;
    }).join('');

    const sel  = STUDENTS.find(s => s.id === state.recSid);
    const recs = (state.records[state.recSid] || []).slice().sort((a, b) => b.date.localeCompare(a.date));
    const today = dkToday();

    const recListHtml = recs.length === 0
      ? `<div class="rec-empty">
           <span class="rec-empty-icon">📋</span>
           아직 기록이 없습니다.<br>위 양식으로 첫 번째 기록을 추가해 보세요.
         </div>`
      : recs.map(r => `
          <div class="record-item">
            <div class="record-header">
              <span class="rec-item-date">${r.date.replace(/-/g, '.')}</span>
              <span class="rec-cat-badge ${CAT_CLASS[r.cat] || 'cat-study'}">${r.cat}</span>
              <button class="rec-del-btn" data-rid="${r.id}" title="삭제">×</button>
            </div>
            <div class="record-content">${esc(r.content)}</div>
          </div>
        `).join('');

    el.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">누가 기록</h1>
        <p class="page-subtitle">학생별 관찰·행동·상담 누적 기록</p>
      </div>
      <div class="records-layout">
        <div class="records-sidebar">${sidebarHtml}</div>
        <div class="records-main">
          <div class="add-record-form">
            <div class="add-form-title">
              <span class="add-form-student">${esc(sel.name)}</span> 학생 기록 추가
            </div>
            <div class="add-form-row">
              <input type="date" id="rec-date" class="rec-date-input" value="${today}">
              <select id="rec-cat" class="rec-cat-select">
                <option value="학습">학습</option>
                <option value="생활/태도">생활/태도</option>
                <option value="칭찬">칭찬</option>
                <option value="특이사항">특이사항</option>
                <option value="상담">상담</option>
              </select>
            </div>
            <div class="ai-section">
              <div class="ai-section-label">✨ AI 기록 작성 도우미</div>
              <div class="ai-keywords">
                ${AI_KEYWORDS.map(k => `<button class="keyword-btn ${state.recKeywords.includes(k) ? 'active' : ''}" data-kw="${esc(k)}">${esc(k)}</button>`).join('')}
              </div>
              <div class="ai-input-row">
                <input type="text" id="ai-memo-inp" class="ai-memo-input"
                  placeholder="한 줄 메모 (선택 사항) — 예: 어머니 통화 완료, 숙제 3회 미제출"
                  value="${esc(state.recMemo)}">
                <button class="btn-ai" id="ai-gen-btn">✨ AI 작성</button>
              </div>
            </div>
            <textarea id="rec-content" class="rec-textarea"
              placeholder="관찰 내용, 행동 특이사항, 상담 내용 등을 입력하거나 위 AI 도우미로 자동 작성하세요..."></textarea>
            <div class="add-form-footer">
              <button class="btn-primary" id="rec-save">저장</button>
            </div>
          </div>
          <div class="record-list">${recListHtml}</div>
        </div>
      </div>
    `;

    // Sidebar: click to switch student
    document.querySelectorAll('[data-rec-sid]').forEach(item => {
      item.addEventListener('click', () => {
        state.recSid = +item.dataset.recSid;
        renderRecords();
      });
    });

    // Delete button
    document.querySelectorAll('.rec-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('이 기록을 삭제하시겠습니까?')) return;
        const rid = +btn.dataset.rid;
        state.records[state.recSid] = (state.records[state.recSid] || []).filter(r => r.id !== rid);
        saveRecords();
        renderRecords();
        if (state.section === 'dashboard') renderDashboard();
      });
    });

    // Keyword toggle (visual only, no re-render)
    document.querySelectorAll('.keyword-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const kw  = btn.dataset.kw;
        const idx = state.recKeywords.indexOf(kw);
        if (idx === -1) state.recKeywords.push(kw);
        else state.recKeywords.splice(idx, 1);
        btn.classList.toggle('active', state.recKeywords.includes(kw));
      });
    });

    // AI memo input
    const aiMemoInp = document.getElementById('ai-memo-inp');
    if (aiMemoInp) {
      aiMemoInp.addEventListener('input', e => { state.recMemo = e.target.value; });
    }

    // AI generate
    const aiGenBtn = document.getElementById('ai-gen-btn');
    if (aiGenBtn) {
      aiGenBtn.addEventListener('click', async () => {
        const ta  = document.getElementById('rec-content');
        const cat = document.getElementById('rec-cat').value;
        aiGenBtn.disabled  = true;
        aiGenBtn.textContent = '생성 중...';
        try {
          const result = await generateRecord(sel.name, cat, state.recKeywords, state.recMemo);
          ta.value = result;
          ta.focus();
        } catch (err) {
          alert('AI 작성 오류가 발생했습니다.\n' + err.message);
        } finally {
          aiGenBtn.disabled    = false;
          aiGenBtn.textContent = '✨ AI 작성';
        }
      });
    }

    // Save new record
    document.getElementById('rec-save').addEventListener('click', () => {
      const date    = document.getElementById('rec-date').value;
      const cat     = document.getElementById('rec-cat').value;
      const content = document.getElementById('rec-content').value.trim();
      if (!content) { document.getElementById('rec-content').focus(); return; }
      if (!state.records[state.recSid]) state.records[state.recSid] = [];
      state.records[state.recSid].push({ id: Date.now(), date, cat, content });
      saveRecords();
      renderRecords();
      if (state.section === 'dashboard') renderDashboard();
    });
  }

  // ─────────────────────────────────────────
  // DETAIL PANEL
  // ─────────────────────────────────────────
  function openPanel(id) {
    const s = STUDENTS.find(x => x.id === id);
    if (!s) return;
    state.detailId = id;

    const memo = state.memos[id] || '';
    const recentRecs = (state.records[id] || [])
      .slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

    const recentHtml = recentRecs.length === 0
      ? `<div style="color:var(--color-ash);font-size:13px;padding:12px 0">아직 누가 기록이 없습니다.</div>`
      : recentRecs.map(r => `
          <div class="panel-rec-item">
            <div class="panel-rec-header">
              <span class="panel-rec-date">${r.date.replace(/-/g, '.')}</span>
              <span class="rec-cat-badge ${CAT_CLASS[r.cat] || 'cat-study'}">${r.cat}</span>
            </div>
            <div class="panel-rec-text">${esc(r.content)}</div>
          </div>
        `).join('');

    document.getElementById('detail-panel').innerHTML = `
      <button class="detail-close" id="panel-close" aria-label="닫기">×</button>

      <div class="detail-header">
        <div class="detail-avatar${s.gender === 'female' ? ' female' : ''}">${initials(s.name)}</div>
        <div>
          <div class="detail-name">${esc(s.name)}</div>
          <div class="detail-meta">
            <span class="gender-badge ${s.gender === 'male' ? 'gender-male' : 'gender-female'}">${s.gender === 'male' ? '남학생' : '여학생'}</span>
            <span>번호 ${s.number}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-section-title">기본 정보</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">생년월일</div>
            <div class="info-value">${formatBirth(s.birth)}</div>
          </div>
          <div class="info-item">
            <div class="info-label">혈액형</div>
            <div class="info-value">${s.blood}형</div>
          </div>
          <div class="info-item">
            <div class="info-label">보호자 연락처</div>
            <div class="info-value">${esc(s.guardian)}</div>
          </div>
          <div class="info-item full">
            <div class="info-label">주소</div>
            <div class="info-value" style="font-size:13px;line-height:1.6">${esc(s.address)}</div>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-section-title">최근 누가 기록 (최대 3건)</div>
        ${recentHtml}
        <button class="btn-outlined" id="go-to-rec" style="margin-top:12px;font-size:13px;padding:6px 16px">
          전체 기록 보기 →
        </button>
      </div>

      <div class="detail-section">
        <div class="detail-section-title">기본 특기사항</div>
        <div class="notes-static">${esc(s.notes)}</div>
      </div>

      <div class="detail-section">
        <div class="detail-section-title">담임 메모</div>
        <textarea class="notes-textarea" id="memo-ta" placeholder="학생에 대한 개인 메모를 입력하세요...">${esc(memo)}</textarea>
        <div class="save-status" id="save-st"></div>
      </div>
    `;

    const overlay = document.getElementById('detail-overlay');
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => overlay.classList.add('visible'));
    document.body.style.overflow = 'hidden';

    document.getElementById('panel-close').addEventListener('click', closePanel);

    // "전체 기록 보기" → 누가 기록 탭으로 이동 & 해당 학생 선택
    document.getElementById('go-to-rec').addEventListener('click', () => {
      closePanel();
      state.recSid = id;
      navigate('records');
    });

    let memoTimer = null;
    const ta = document.getElementById('memo-ta');
    const st = document.getElementById('save-st');

    ta.addEventListener('input', () => {
      clearTimeout(memoTimer);
      st.className = 'save-status';
      st.textContent = '입력 중...';
      memoTimer = setTimeout(() => {
        state.memos[id] = ta.value;
        saveMemos();
        st.className = 'save-status saved';
        st.textContent = '저장됨 ✓';
        if (state.section === 'dashboard') renderDashboard();
      }, 700);
    });
  }

  function closePanel() {
    const overlay = document.getElementById('detail-overlay');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.classList.add('hidden'); }, 300);
    state.detailId = null;
  }

  // ─────────────────────────────────────────
  // 학급 이름 인라인 편집
  // ─────────────────────────────────────────
  function initClassNameEdit() {
    const el = document.querySelector('.nav-title');
    if (!el) return;
    el.textContent = state.className;
    el.title = '클릭하여 학급 이름 변경';
    el.style.cursor = 'pointer';

    el.addEventListener('click', () => {
      const inp = document.createElement('input');
      inp.value = state.className;
      inp.style.cssText = 'font:inherit;background:transparent;border:none;border-bottom:2px solid var(--indigo);outline:none;width:130px;color:inherit;padding:0;';
      el.replaceWith(inp);
      inp.focus(); inp.select();

      const commit = () => {
        const val = inp.value.trim() || state.className;
        state.className = val;
        saveClassName();
        const newEl = document.createElement('div');
        newEl.className = 'nav-title';
        inp.replaceWith(newEl);
        initClassNameEdit();
        document.title = `${val} 학생 관리`;
        if (state.section === 'dashboard') renderDashboard();
        if (state.section === 'students')  renderStudents();
      };
      inp.addEventListener('blur', commit);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); if (e.key === 'Escape') { inp.value = state.className; inp.blur(); } });
    });
  }

  // ─────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────
  async function init() {
    loadStorage();
    await loadCSVData();
    const csvRecLoaded = await loadCSVRecords();
    initDemoAttendance();
    if (!csvRecLoaded) initDemoRecords();

    document.title = `${state.className} 학생 관리`;
    initClassNameEdit();

    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.section));
    });

    document.getElementById('detail-overlay').addEventListener('click', e => {
      if (e.target === e.currentTarget) closePanel();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && state.detailId !== null) closePanel();
    });

    const hash = location.hash.slice(1);
    const valid = ['dashboard', 'students', 'attendance', 'records'];
    navigate(valid.includes(hash) ? hash : 'dashboard');
  }

  init();
})();
