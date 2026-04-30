// popup UI — constants.js가 먼저 로드됨

// ============================================================
// i18n
// ============================================================
const I18N = {
  eng: {
    appName: '🎵 YTM Scheduler',
    openYtm: 'Open',
    tabSleep: '😴 Sleep',
    tabAlarm: '⏰ Alarm',
    tabPlaylist: '🎶 Playlist',
    p15: '15 min', p30: '30 min', p60: '1 hour', p120: '2 hours',
    timeSet: '⏱ Set time',
    fadeout: 'Volume fade-out (30s)',
    startTimer: '🌙 Start timer',
    statusNone: 'No active timer',
    remainingLabel: 'Remaining:',
    cancel: 'Cancel', save: 'Save', apply: 'Apply',
    addAlarm: '+ Add alarm',
    time: 'Time', repeat: 'Repeat', playlist: 'Playlist',
    shuffle: '🔀 Shuffle', volume: '🔊 Volume',
    daily: 'Daily', weekday: 'Weekday', weekend: 'Weekend',
    sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
    addUrl: 'Add URL', importLib: 'Import from library',
    alias: 'Alias',
    timeSetTitle: 'Custom duration',
    hours: 'Hours', minutes: 'Minutes', total: 'Total', min: 'min',
    edit: 'Edit', delete: 'Delete', add: 'Add', added: 'Added',
    noPlaylist: 'No saved playlists',
    maxReached: 'Max count reached',
    enterAliasUrl: 'Enter alias and URL',
    ytmUrlOnly: 'YouTube Music URL only',
    saved: 'Saved', deleted: 'Deleted',
    dupUrl: 'URL already saved',
    selectTime: 'Enter time',
    selectDays: 'Select days',
    selectPlaylist: 'Select playlist',
    importingNow: 'Importing...',
    importFailed: 'Import failed',
    loginFirst: 'Please log in first',
    timerCanceled: 'Timer canceled',
    noYtmTab: 'Please open YouTube Music first',
    tabOpened: 'New YTM tab opened',
    tabSwitched: 'Switched to YTM tab',
    foundN: (n) => `${n} found`,
    timerStarted: (m) => `Timer started (${m} min)`,
    rangeHint: 'Range: 1–480 min',
    mpIdle: 'Not playing',
    mpNoTab: 'YouTube Music not open',
    sleepLog: 'Sleep log',
    clearLog: 'Clear log',
    logStart: (m) => `Timer started (${m} min)`,
    logEnd: 'Timer ended',
    logSuccess: 'Stopped successfully',
    logFailed: 'Stop failed',
    logCanceled: 'Timer canceled',
    sysVolHint: 'System vol: check OS settings',
    ytmVol: 'YTM volume',
    sysVolSep: 'System volume is separate',
  },
  kor: {
    appName: '🎵 YTM 스케줄러',
    openYtm: '열기',
    tabSleep: '😴 슬립',
    tabAlarm: '⏰ 알람',
    tabPlaylist: '🎶 플레이리스트',
    p15: '15분', p30: '30분', p60: '1시간', p120: '2시간',
    timeSet: '⏱ 시간설정',
    fadeout: '볼륨 페이드아웃 (30초)',
    startTimer: '🌙 타이머 시작',
    statusNone: '타이머 없음',
    remainingLabel: '남은 시간:',
    cancel: '취소', save: '저장', apply: '적용',
    addAlarm: '+ 새 알람 추가',
    time: '시각', repeat: '반복', playlist: '플레이리스트',
    shuffle: '🔀 셔플', volume: '🔊 볼륨',
    daily: '매일', weekday: '평일', weekend: '주말',
    sun: '일', mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토',
    addUrl: 'URL로 추가', importLib: '라이브러리에서 가져오기',
    alias: '별명',
    timeSetTitle: '시간 직접 설정',
    hours: '시간', minutes: '분', total: '총', min: '분',
    edit: '수정', delete: '삭제', add: '추가', added: '추가됨',
    noPlaylist: '저장된 플레이리스트 없음',
    maxReached: '최대 개수 초과',
    enterAliasUrl: '별명과 URL을 입력하세요',
    ytmUrlOnly: 'YouTube Music URL만 허용',
    saved: '저장됨', deleted: '삭제됨',
    dupUrl: '이미 저장된 URL',
    selectTime: '시각을 입력하세요',
    selectDays: '요일을 선택하세요',
    selectPlaylist: '플레이리스트를 선택하세요',
    importingNow: '가져오는 중...',
    importFailed: '가져오기 실패',
    loginFirst: '로그인 상태를 확인하세요',
    timerCanceled: '타이머 취소',
    noYtmTab: 'YouTube Music 탭을 먼저 여세요',
    tabOpened: 'YTM 새 탭 열림',
    tabSwitched: 'YTM 탭으로 전환',
    foundN: (n) => `${n}개 발견`,
    timerStarted: (m) => `${m}분 타이머 시작`,
    rangeHint: '1~480분 범위',
    mpIdle: '재생 중 아님',
    mpNoTab: 'YouTube Music 미연결',
    sleepLog: '슬립 기록',
    clearLog: '기록 삭제',
    logStart: (m) => `${m}분 타이머 시작`,
    logEnd: '타이머 종료',
    logSuccess: '정상 정지 완료',
    logFailed: '정지 실패',
    logCanceled: '타이머 취소',
    sysVolHint: '시스템 볼륨: OS 설정 확인',
    ytmVol: 'YTM 볼륨',
    sysVolSep: '시스템 볼륨은 별도',
  },
  jpn: {
    appName: '🎵 YTMスケジューラー',
    openYtm: '開く',
    tabSleep: '😴 スリープ',
    tabAlarm: '⏰ アラーム',
    tabPlaylist: '🎶 プレイリスト',
    p15: '15分', p30: '30分', p60: '1時間', p120: '2時間',
    timeSet: '⏱ 時間設定',
    fadeout: '音量フェードアウト (30秒)',
    startTimer: '🌙 タイマー開始',
    statusNone: 'タイマーなし',
    remainingLabel: '残り時間:',
    cancel: 'キャンセル', save: '保存', apply: '適用',
    addAlarm: '+ アラーム追加',
    time: '時刻', repeat: '繰り返し', playlist: 'プレイリスト',
    shuffle: '🔀 シャッフル', volume: '🔊 音量',
    daily: '毎日', weekday: '平日', weekend: '週末',
    sun: '日', mon: '月', tue: '火', wed: '水', thu: '木', fri: '金', sat: '土',
    addUrl: 'URLで追加', importLib: 'ライブラリから取得',
    alias: '別名',
    timeSetTitle: 'カスタム時間',
    hours: '時間', minutes: '分', total: '合計', min: '分',
    edit: '編集', delete: '削除', add: '追加', added: '追加済み',
    noPlaylist: '保存されたプレイリストなし',
    maxReached: '最大数に達しました',
    enterAliasUrl: '別名とURLを入力',
    ytmUrlOnly: 'YouTube Music URLのみ',
    saved: '保存しました', deleted: '削除しました',
    dupUrl: '既に保存済みのURL',
    selectTime: '時刻を入力',
    selectDays: '曜日を選択',
    selectPlaylist: 'プレイリストを選択',
    importingNow: '取得中...',
    importFailed: '取得失敗',
    loginFirst: 'ログイン状態を確認',
    timerCanceled: 'タイマー取り消し',
    noYtmTab: 'YouTube Musicタブを開いてください',
    tabOpened: 'YTMの新しいタブを開きました',
    tabSwitched: 'YTMタブに切り替え',
    foundN: (n) => `${n}件見つかりました`,
    timerStarted: (m) => `${m}分タイマー開始`,
    rangeHint: '1〜480分の範囲',
    mpIdle: '再生していません',
    mpNoTab: 'YouTube Music 未接続',
    sleepLog: 'スリープ履歴',
    clearLog: '履歴削除',
    logStart: (m) => `${m}分タイマー開始`,
    logEnd: 'タイマー終了',
    logSuccess: '正常に停止',
    logFailed: '停止失敗',
    logCanceled: 'タイマー取り消し',
    sysVolHint: 'システム音量: OS設定を確認',
    ytmVol: 'YTM音量',
    sysVolSep: 'システム音量は別',
  },
};

let currentLang = 'eng';
const LANG_KEY = 'lang';
const t = (key, ...args) => {
  const v = I18N[currentLang]?.[key] ?? I18N.eng[key] ?? key;
  return typeof v === 'function' ? v(...args) : v;
};

const applyLang = () => {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('.lang').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
  document.documentElement.lang =
    currentLang === 'kor' ? 'ko' : currentLang === 'jpn' ? 'ja' : 'en';
  // 동적 렌더 영역 재갱신
  renderAlarms();
  renderPlaylists();
  loadSleepLog();
};

// ============================================================
// 유틸
// ============================================================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const sendMessage = (msg) =>
  new Promise((resolve) =>
    chrome.runtime.sendMessage(msg, (resp) =>
      resolve(chrome.runtime.lastError ? { success: false, error: chrome.runtime.lastError.message } : resp)
    )
  );
const getStorage = (k) => new Promise((r) => chrome.storage.local.get(k, r));
const setStorage = (o) => new Promise((r) => chrome.storage.local.set(o, r));

const toast = (msg, ms = 1800) => {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add('hidden'), ms);
};

const genId = (p) => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

// 개발자용 에러 코드 → 사용자 친화 메시지
const friendlyError = (code) => {
  const map = {
    YTM_TAB_NOT_FOUND: () => t('noYtmTab'),
    NO_YTM_TAB: () => t('noYtmTab'),
    PLAYER_NOT_READY: () => t('noYtmTab'),
    SEND_FAILED: () => t('noYtmTab'),
    SELECTOR_NOT_FOUND: () => t('noYtmTab'),
    INVALID_MINUTES: () => t('rangeHint'),
    INVALID_ALARM: () => t('selectTime'),
    MAX_ALARMS_REACHED: () => t('maxReached'),
  };
  return (map[code] ? map[code]() : code) || 'Error';
};

const formatDays = (days = []) => {
  const s = [...days].sort();
  if (s.length === 7) return t('daily');
  if (s.length === 5 && [1, 2, 3, 4, 5].every((d) => s.includes(d))) return t('weekday');
  if (s.length === 2 && s.includes(0) && s.includes(6)) return t('weekend');
  const labels = [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')];
  return s.map((d) => labels[d]).join(',');
};

const formatRemaining = (ms) => {
  if (ms <= 0) return '0:00';
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

// ============================================================
// 탭 / 언어
// ============================================================
$$('.tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.tab;
    $$('.tab').forEach((b) => b.classList.toggle('active', b === btn));
    $$('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === `tab-${name}`));
  });
});

$$('.lang').forEach((btn) => {
  btn.addEventListener('click', async () => {
    currentLang = btn.dataset.lang;
    await setStorage({ [LANG_KEY]: currentLang });
    applyLang();
  });
});

// ============================================================
// 슬립 타이머
// ============================================================
let sleepTickId = null;
let sleepEndTime = null;
let customMinutes = null; // 시간설정 모달에서 지정한 값

const stopSleepTick = () => {
  if (sleepTickId) clearInterval(sleepTickId);
  sleepTickId = null;
  sleepEndTime = null;
};

const tickSleep = () => {
  if (!sleepEndTime) return;
  const rem = sleepEndTime - Date.now();
  const remEl = $('#sleep-remaining');
  if (!remEl) { stopSleepTick(); return; }
  if (rem <= 0) { stopSleepTick(); loadStatus(); return; }
  remEl.textContent = formatRemaining(rem);
};

const renderSleepStatus = (sleep) => {
  const el = $('#sleep-status');
  stopSleepTick();

  if (sleep && sleep.active && sleep.remainingMs > 0) {
    sleepEndTime = Date.now() + sleep.remainingMs;
    el.innerHTML = `
      <span><span class="muted">${t('remainingLabel')}</span>
        <span id="sleep-remaining" class="remaining">${formatRemaining(sleep.remainingMs)}</span>
      </span>
      <button id="sleep-cancel" class="btn btn-ghost btn-sm">${t('cancel')}</button>
    `;
    $('#sleep-cancel').addEventListener('click', async () => {
      const r = await sendMessage({ type: MSG_POPUP_TO_SW.CANCEL_SLEEP_TIMER });
      if (r?.success) { toast(t('timerCanceled')); stopSleepTick(); loadStatus(); loadSleepLog(); }
    });
    sleepTickId = setInterval(tickSleep, 1000);
  } else {
    el.innerHTML = `<span class="muted">${t('statusNone')}</span>`;
  }
};

$('#sleep-start').addEventListener('click', async () => {
  let minutes;
  const preset = $('input[name="sleep-preset"]:checked')?.value;
  if (preset === 'custom' && customMinutes) {
    minutes = customMinutes;
  } else if (preset) {
    minutes = Number(preset);
  } else if (customMinutes) {
    minutes = customMinutes;
  } else {
    return toast(t('rangeHint'));
  }
  if (!Number.isFinite(minutes) || minutes < 1 || minutes > 480) {
    return toast(t('rangeHint'));
  }
  const fadeOutEnabled = $('#sleep-fadeout').checked;
  const r = await sendMessage({
    type: MSG_POPUP_TO_SW.SET_SLEEP_TIMER,
    payload: { minutes, fadeOutEnabled },
  });
  if (r?.success) {
    toast(t('timerStarted', minutes));
    loadStatus();
    loadSleepLog();
  } else {
    toast(`⚠️ ${friendlyError(r?.error)}`);
  }
});

// ============================================================
// 시간설정 모달
// ============================================================
let stepH = 0, stepM = 30;

const updateStepperUI = () => {
  $('#step-h').textContent = stepH;
  $('#step-m').textContent = stepM;
  $('#step-total').textContent = stepH * 60 + stepM;
};

const openTimeModal = () => {
  // 기존 custom 값이 있으면 반영
  if (customMinutes) {
    stepH = Math.floor(customMinutes / 60);
    stepM = customMinutes % 60;
  }
  updateStepperUI();
  $('#time-modal').classList.remove('hidden');
};
const closeTimeModal = () => $('#time-modal').classList.add('hidden');

$('#sleep-time-set').addEventListener('click', openTimeModal);
$('#time-modal-close').addEventListener('click', closeTimeModal);
$('#time-modal-cancel').addEventListener('click', closeTimeModal);
$('#time-modal .modal-backdrop').addEventListener('click', closeTimeModal);

$$('[data-step]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const op = btn.dataset.step;
    if (op === 'h+') stepH = Math.min(8, stepH + 1);
    else if (op === 'h-') stepH = Math.max(0, stepH - 1);
    else if (op === 'm+') {
      stepM += 5;
      if (stepM >= 60) { stepM -= 60; stepH = Math.min(8, stepH + 1); }
    } else if (op === 'm-') {
      stepM -= 5;
      if (stepM < 0) {
        if (stepH > 0) { stepH -= 1; stepM += 60; } else stepM = 0;
      }
    }
    // 480분 상한
    if (stepH * 60 + stepM > 480) { stepH = 8; stepM = 0; }
    if (stepH === 0 && stepM === 0) stepM = 5;
    updateStepperUI();
  });
});

$('#time-modal-apply').addEventListener('click', () => {
  const total = stepH * 60 + stepM;
  if (total < 1 || total > 480) return toast(t('rangeHint'));
  customMinutes = total;
  // custom 라벨 업데이트 (hour:minute → N min)
  const label = $('#sleep-time-set-label');
  label.textContent = `${total} ${t('min')}`;
  label.classList.remove('hidden');
  // 프리셋 선택 해제하고 custom로 동작
  $$('input[name="sleep-preset"]').forEach((r) => (r.checked = false));
  closeTimeModal();
  toast(`${total} ${t('min')}`);
});

// ============================================================
// 알람
// ============================================================
const resetAlarmForm = () => {
  $('#alarm-form').classList.add('hidden');
  $('#alarm-id').value = '';
};

const populatePlaylistSelect = async () => {
  const { [STORAGE_KEYS.PLAYLISTS]: playlists = [] } = await getStorage(STORAGE_KEYS.PLAYLISTS);
  const sel = $('#alarm-playlist');
  sel.innerHTML = playlists.length
    ? playlists.map((p) => `<option value="${p.id}">${escapeHtml(p.alias)}</option>`).join('')
    : `<option value="">${t('noPlaylist')}</option>`;
};

const openAlarmForm = async (alarm = null) => {
  await populatePlaylistSelect();
  $('#alarm-form').classList.remove('hidden');
  if (alarm) {
    $('#alarm-id').value = alarm.id;
    $('#alarm-time').value = alarm.time;
    $$('#tab-alarm .day-checks input').forEach((c) => {
      c.checked = alarm.days.includes(Number(c.dataset.day));
    });
    $('#alarm-playlist').value = alarm.playlistId || '';
    $('#alarm-shuffle').checked = !!alarm.shuffle;
    $('#alarm-volume').value = alarm.volume ?? 50;
    $('#alarm-volume-label').textContent = `${alarm.volume ?? 50}%`;
  } else {
    $('#alarm-id').value = '';
    $('#alarm-time').value = '07:00';
    $$('#tab-alarm .day-checks input').forEach((c) => (c.checked = false));
    $('#alarm-shuffle').checked = true;
    // 현재 재생 중인 YTM 볼륨을 기본값으로
    const currentVol = nowPlayingState?.payload?.volume;
    const defVol = Number.isFinite(currentVol) ? Math.round(currentVol) : 50;
    $('#alarm-volume').value = defVol;
    $('#alarm-volume-label').textContent = `${defVol}%`;
  }
};

$('#alarm-add').addEventListener('click', async () => {
  const { [STORAGE_KEYS.ALARMS]: alarms = [] } = await getStorage(STORAGE_KEYS.ALARMS);
  if (alarms.length >= MAX_ALARMS) return toast(t('maxReached'));
  const { [STORAGE_KEYS.PLAYLISTS]: playlists = [] } = await getStorage(STORAGE_KEYS.PLAYLISTS);
  if (playlists.length === 0) return toast(t('noPlaylist'));
  await openAlarmForm(null);
});

$('#alarm-cancel').addEventListener('click', resetAlarmForm);
$('#alarm-volume').addEventListener('input', (e) => {
  $('#alarm-volume-label').textContent = `${e.target.value}%`;
});

$$('.day-presets button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const map = { daily: [0,1,2,3,4,5,6], weekday: [1,2,3,4,5], weekend: [0,6] };
    const target = map[btn.dataset.preset] || [];
    $$('#tab-alarm .day-checks input').forEach((c) => {
      c.checked = target.includes(Number(c.dataset.day));
    });
  });
});

$('#alarm-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const isNew = !$('#alarm-id').value;
  const id = isNew ? genId('alarm') : $('#alarm-id').value;
  const time = $('#alarm-time').value;
  const days = $$('#tab-alarm .day-checks input:checked').map((c) => Number(c.dataset.day));
  const playlistId = $('#alarm-playlist').value;
  const shuffle = $('#alarm-shuffle').checked;
  const volume = Number($('#alarm-volume').value);

  if (!time) return toast(t('selectTime'));
  if (days.length === 0) return toast(t('selectDays'));
  if (!playlistId) return toast(t('selectPlaylist'));

  const payload = { id, time, days, playlistId, shuffle, volume };
  if (isNew) payload.enabled = true;

  const r = await sendMessage({
    type: MSG_POPUP_TO_SW.SET_ALARM,
    payload,
  });
  if (r?.success) { toast(t('saved')); resetAlarmForm(); renderAlarms(); }
  else toast(`⚠️ ${friendlyError(r?.error)}`);
});

async function renderAlarms() {
  const [{ [STORAGE_KEYS.ALARMS]: alarms = [] }, { [STORAGE_KEYS.PLAYLISTS]: playlists = [] }] =
    await Promise.all([getStorage(STORAGE_KEYS.ALARMS), getStorage(STORAGE_KEYS.PLAYLISTS)]);

  $('#alarm-add').disabled = alarms.length >= MAX_ALARMS;
  const list = $('#alarm-list');
  if (alarms.length === 0) {
    list.innerHTML = `<div class="empty">${t('statusNone')}</div>`;
    return;
  }
  list.innerHTML = alarms.map((a) => {
    const pl = playlists.find((p) => p.id === a.playlistId);
    return `
      <div class="card" data-id="${a.id}">
        <div class="card-head">
          <div class="card-title">⏰ ${a.time} <span class="muted">${formatDays(a.days)}</span></div>
          <input type="checkbox" class="toggle" data-action="toggle" ${a.enabled ? 'checked' : ''} />
        </div>
        <div class="card-meta">
          <span>🎶 ${escapeHtml(pl?.alias || '—')}</span>
          <span>🔀 ${a.shuffle ? 'ON' : 'OFF'}</span>
          <span>🔊 ${a.volume}%</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-sm" data-action="edit">${t('edit')}</button>
          <button class="btn btn-danger btn-sm" data-action="delete">${t('delete')}</button>
        </div>
      </div>`;
  }).join('');

  list.querySelectorAll('.card').forEach((card) => {
    const id = card.dataset.id;
    card.querySelector('[data-action="toggle"]').addEventListener('change', async (e) => {
      await sendMessage({ type: MSG_POPUP_TO_SW.TOGGLE_ALARM, payload: { id, enabled: e.target.checked } });
    });
    card.querySelector('[data-action="edit"]').addEventListener('click', async () => {
      const a = alarms.find((x) => x.id === id);
      if (a) await openAlarmForm(a);
    });
    card.querySelector('[data-action="delete"]').addEventListener('click', async () => {
      const r = await sendMessage({ type: MSG_POPUP_TO_SW.DELETE_ALARM, payload: { id } });
      if (r?.success) { toast(t('deleted')); renderAlarms(); }
    });
  });
}

// ============================================================
// 플레이리스트
// ============================================================
const resetPlaylistForm = () => {
  $('#pl-form').classList.add('hidden');
  $('#pl-id').value = '';
  $('#pl-alias').value = '';
  $('#pl-url').value = '';
};

const openPlaylistForm = (pl = null) => {
  $('#pl-form').classList.remove('hidden');
  $('#pl-import-list').classList.add('hidden');
  if (pl) {
    $('#pl-id').value = pl.id;
    $('#pl-alias').value = pl.alias;
    $('#pl-url').value = pl.url;
  } else {
    $('#pl-id').value = '';
    $('#pl-alias').value = '';
    $('#pl-url').value = '';
  }
};

$('#pl-add-url').addEventListener('click', async () => {
  const { [STORAGE_KEYS.PLAYLISTS]: playlists = [] } = await getStorage(STORAGE_KEYS.PLAYLISTS);
  if (playlists.length >= MAX_PLAYLISTS) return toast(t('maxReached'));
  openPlaylistForm(null);
});
$('#pl-cancel').addEventListener('click', resetPlaylistForm);

$('#pl-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = $('#pl-id').value || genId('pl');
  const alias = $('#pl-alias').value.trim();
  const url = $('#pl-url').value.trim();
  if (!alias || !url) return toast(t('enterAliasUrl'));
  if (!/^https:\/\/music\.youtube\.com\//.test(url)) return toast(t('ytmUrlOnly'));

  const { [STORAGE_KEYS.PLAYLISTS]: playlists = [] } = await getStorage(STORAGE_KEYS.PLAYLISTS);
  const idx = playlists.findIndex((p) => p.id === id);
  if (idx >= 0) playlists[idx] = { ...playlists[idx], alias, url };
  else {
    if (playlists.length >= MAX_PLAYLISTS) return toast(t('maxReached'));
    playlists.push({ id, alias, url, shuffle: false, volume: 50 });
  }
  await setStorage({ [STORAGE_KEYS.PLAYLISTS]: playlists });
  resetPlaylistForm();
  toast(t('saved'));
  renderPlaylists();
});

$('#pl-import').addEventListener('click', async () => {
  const btn = $('#pl-import');
  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = t('importingNow');
  try {
    importState.added.clear();
    const resp = await sendMessage({ type: MSG_POPUP_TO_SW.IMPORT_PLAYLISTS });
    if (!resp?.success || !Array.isArray(resp.payload)) {
      const hint = resp?.error === 'NO_PLAYLISTS_FOUND' ? t('loginFirst') : (resp?.error || 'UNKNOWN');
      toast(`${t('importFailed')}: ${hint}`, 3200);
      return;
    }
    renderImportList(resp.payload);
    toast(t('foundN', resp.payload.length));
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
  }
});

const importState = { items: [], added: new Set() };

const renderImportList = (items) => {
  if (items) importState.items = items;
  const el = $('#pl-import-list');
  const list = importState.items;
  if (list.length === 0) {
    el.innerHTML = `<div class="empty">${t('noPlaylist')}</div>`;
    el.classList.remove('hidden');
    $('#pl-form').classList.add('hidden');
    return;
  }
  const ordered = [...list].sort((a, b) => {
    const A = importState.added.has(a.url) ? 0 : 1;
    const B = importState.added.has(b.url) ? 0 : 1;
    return A - B;
  });
  el.innerHTML = ordered.map((it) => {
    const isAdded = importState.added.has(it.url);
    return `
      <div class="card ${isAdded ? 'added' : ''}" data-url="${escapeHtml(it.url)}">
        <div class="card-head">
          <div class="card-title">${escapeHtml(it.alias)}</div>
          <button class="btn ${isAdded ? 'btn-ghost' : 'btn-secondary'} btn-sm"
                  data-action="add" ${isAdded ? 'disabled' : ''}>
            ${isAdded ? t('added') : t('add')}
          </button>
        </div>
      </div>`;
  }).join('');

  el.querySelectorAll('[data-action="add"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const card = btn.closest('.card');
      const url = card?.dataset.url;
      const it = importState.items.find((x) => x.url === url);
      if (!it || importState.added.has(url)) return;
      const { [STORAGE_KEYS.PLAYLISTS]: playlists = [] } = await getStorage(STORAGE_KEYS.PLAYLISTS);
      if (playlists.length >= MAX_PLAYLISTS) return toast(t('maxReached'));
      if (playlists.some((p) => p.url === it.url)) {
        importState.added.add(url);
        renderImportList();
        toast(t('dupUrl'));
        return;
      }
      playlists.push({ id: genId('pl'), alias: it.alias, url: it.url, shuffle: false, volume: 50 });
      await setStorage({ [STORAGE_KEYS.PLAYLISTS]: playlists });
      importState.added.add(url);
      renderImportList();
      renderPlaylists();
      toast(t('saved'));
    });
  });
  el.classList.remove('hidden');
  $('#pl-form').classList.add('hidden');
};

async function renderPlaylists() {
  const { [STORAGE_KEYS.PLAYLISTS]: playlists = [] } = await getStorage(STORAGE_KEYS.PLAYLISTS);
  const list = $('#pl-list');
  if (playlists.length === 0) {
    list.innerHTML = `<div class="empty">${t('noPlaylist')}</div>`;
    return;
  }
  list.innerHTML = playlists.map((p) => `
    <div class="card" data-id="${p.id}">
      <div class="card-head">
        <div class="card-title">${escapeHtml(p.alias)}</div>
      </div>
      <div class="card-meta"><span>${escapeHtml(p.url)}</span></div>
      <div class="card-actions">
        <button class="btn btn-ghost btn-sm" data-action="edit">${t('edit')}</button>
        <button class="btn btn-danger btn-sm" data-action="delete">${t('delete')}</button>
      </div>
    </div>`).join('');
  list.querySelectorAll('.card').forEach((card) => {
    const id = card.dataset.id;
    card.querySelector('[data-action="edit"]').addEventListener('click', () => {
      const pl = playlists.find((x) => x.id === id);
      if (pl) openPlaylistForm(pl);
    });
    card.querySelector('[data-action="delete"]').addEventListener('click', async () => {
      const next = playlists.filter((x) => x.id !== id);
      await setStorage({ [STORAGE_KEYS.PLAYLISTS]: next });
      toast(t('deleted'));
      renderPlaylists();
    });
  });
}

// ============================================================
// 미니 플레이어
// ============================================================
let nowPlayingState = null; // { isPlaying, volume, title, artist, thumbnail }
let mpPollId = null;
let mpVolumeUserDragging = false;

const renderMiniPlayer = (state, hasYtmTab) => {
  const titleEl = $('#mp-title');
  const artistEl = $('#mp-artist');
  const thumbWrap = $('.mp-thumb');
  const thumbImg = $('#mp-thumb-img');
  const playBtn = $('#mp-play');
  const volSlider = $('#mp-volume');

  if (!hasYtmTab) {
    titleEl.textContent = t('mpNoTab');
    artistEl.textContent = '';
    thumbWrap.classList.remove('loaded');
    playBtn.disabled = true;
    volSlider.disabled = true;
    return;
  }
  const p = (state && state.success) ? (state.payload || {}) : {};
  const hasPlayer = !!p.hasPlayer;

  if (!hasPlayer) {
    titleEl.textContent = t('mpIdle');
    artistEl.textContent = '';
    thumbWrap.classList.remove('loaded');
    playBtn.disabled = true;
    volSlider.disabled = true;
    return;
  }

  // 플레이어 존재 — 트랙 유무에 따라 표시
  playBtn.disabled = !p.title;
  volSlider.disabled = false;

  if (p.title) {
    titleEl.textContent = p.title;
    titleEl.removeAttribute('data-i18n');
  } else {
    titleEl.textContent = t('mpIdle');
  }
  artistEl.textContent = p.artist || '';

  if (p.thumbnail) {
    if (thumbImg.src !== p.thumbnail) thumbImg.src = p.thumbnail;
    thumbWrap.classList.add('loaded');
  } else {
    thumbWrap.classList.remove('loaded');
  }

  playBtn.textContent = p.isPlaying ? '❚❚' : '▶';

  if (!mpVolumeUserDragging && Number.isFinite(p.volume)) {
    volSlider.value = p.volume;
    const pctEl = $('#mp-vol-pct');
    if (pctEl) pctEl.textContent = `${p.volume}%`;
  }
};

const fetchNowPlaying = async () => {
  const resp = await sendMessage({ type: MSG_POPUP_TO_SW.GET_NOW_PLAYING });
  if (resp?.error === 'NO_YTM_TAB') {
    nowPlayingState = null;
    renderMiniPlayer(null, false);
  } else {
    nowPlayingState = resp;
    renderMiniPlayer(resp, true);
  }
};

$('#mp-play').addEventListener('click', async () => {
  const isPlaying = nowPlayingState?.payload?.isPlaying;
  await sendMessage({
    type: MSG_POPUP_TO_SW.CONTROL,
    payload: { type: isPlaying ? MSG_SW_TO_CS.PAUSE : MSG_SW_TO_CS.PLAY },
  });
  setTimeout(fetchNowPlaying, 300);
});

$('#mp-volume').addEventListener('input', () => {
  mpVolumeUserDragging = true;
  const pctEl = $('#mp-vol-pct');
  if (pctEl) pctEl.textContent = `${$('#mp-volume').value}%`;
});
$('#mp-volume').addEventListener('change', async (e) => {
  const v = Number(e.target.value);
  await sendMessage({
    type: MSG_POPUP_TO_SW.CONTROL,
    payload: { type: MSG_SW_TO_CS.SET_VOLUME, payload: { volume: v } },
  });
  mpVolumeUserDragging = false;
  const pctEl = $('#mp-vol-pct');
  if (pctEl) pctEl.textContent = `${v}%`;
  setTimeout(fetchNowPlaying, 200);
});

const startMpPolling = () => {
  if (mpPollId) clearInterval(mpPollId);
  mpPollId = setInterval(fetchNowPlaying, 2500);
};

// ============================================================
// 연결 상태 / 상태 로드
// ============================================================
const renderConnection = (ytmTab) => {
  const el = $('#conn-status');
  const btn = $('#open-ytm');
  if (ytmTab) {
    el.textContent = '●';
    el.className = 'conn-dot connected';
  } else {
    el.textContent = '●';
    el.className = 'conn-dot disconnected';
  }
};

async function loadStatus() {
  const status = await sendMessage({ type: MSG_POPUP_TO_SW.GET_STATUS });
  if (status?.success) {
    renderSleepStatus(status.sleepTimer);
    renderConnection(status.ytmTab);
    if (status.lastError) {
      const ago = Math.round((Date.now() - status.lastError.timestamp) / 1000);
      toast(`⚠️ ${status.lastError.context} (${ago}s)`, 3200);
    }
  }
}

$('#open-ytm').addEventListener('click', async () => {
  const r = await sendMessage({ type: MSG_POPUP_TO_SW.OPEN_YTM });
  if (r?.success) {
    toast(r.existed ? t('tabSwitched') : t('tabOpened'));
    setTimeout(loadStatus, 500);
  }
});

// ============================================================
// 초기 로드
// ============================================================
(async () => {
  const { [LANG_KEY]: lang } = await getStorage(LANG_KEY);
  if (lang && I18N[lang]) currentLang = lang;
  applyLang();
  await loadStatus();
  await fetchNowPlaying();
  await loadSleepLog();
  startMpPolling();
})();

// ============================================================
// 슬립 로그
// ============================================================
const formatLogTime = (ts) => {
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getMonth()+1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const logTypeInfo = (entry) => {
  switch (entry.type) {
    case 'start':   return { icon: '🌙', text: t('logStart', entry.minutes || '?'), cls: '' };
    case 'end':     return entry.result === 'success'
                      ? { icon: '✅', text: t('logSuccess'), cls: 'log-success' }
                      : { icon: '❌', text: `${t('logFailed')}: ${entry.error || ''}`, cls: 'log-failed' };
    case 'canceled': return { icon: '⏹️', text: t('logCanceled'), cls: '' };
    default:         return { icon: '❓', text: entry.type, cls: '' };
  }
};

async function loadSleepLog() {
  const resp = await sendMessage({ type: MSG_POPUP_TO_SW.GET_SLEEP_LOG });
  const log = resp?.log || [];
  const countEl = $('#sleep-log-count');
  if (countEl) countEl.textContent = log.length;
  const listEl = $('#sleep-log-list');
  if (!listEl) return;
  if (log.length === 0) {
    listEl.innerHTML = `<div class="empty">${t('statusNone')}</div>`;
    return;
  }
  listEl.innerHTML = log.map((entry) => {
    const info = logTypeInfo(entry);
    return `<div class="sleep-log-entry ${info.cls}">
      <span class="log-icon">${info.icon}</span>
      <span class="log-text">${escapeHtml(info.text)}</span>
      <span class="log-time">${formatLogTime(entry.timestamp)}</span>
    </div>`;
  }).join('');
}

$('#sleep-log-clear')?.addEventListener('click', async () => {
  await sendMessage({ type: MSG_POPUP_TO_SW.CLEAR_SLEEP_LOG });
  toast(t('deleted'));
  loadSleepLog();
});


