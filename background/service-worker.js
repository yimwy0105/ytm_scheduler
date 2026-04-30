// 백그라운드 계층: 슬립 타이머 / 알람 스케줄 관리
importScripts('../utils/constants.js');

// ---------- 알람 이름 ----------
const ALARM = {
  SLEEP_END: 'sleepTimer:end',
  SLEEP_FADE: 'sleepTimer:fade',
  SLEEP_BADGE: 'sleepTimer:badge',
  ALARM_CHECK: 'alarm:check',
};

const YTM_URL_PATTERN = 'https://music.youtube.com/*';
const PENDING_PLAYBACK_KEY = 'pendingAlarmPlayback';
const LAST_ERROR_KEY = 'lastError';

const recordError = (context, detail) =>
  setStorage({
    [LAST_ERROR_KEY]: {
      context,
      detail: typeof detail === 'string' ? detail : JSON.stringify(detail),
      timestamp: Date.now(),
    },
  });

// ---------- storage 헬퍼 ----------
const getStorage = (keys) =>
  new Promise((resolve) => chrome.storage.local.get(keys, resolve));
const setStorage = (obj) =>
  new Promise((resolve) => chrome.storage.local.set(obj, resolve));
const removeStorage = (keys) =>
  new Promise((resolve) => chrome.storage.local.remove(keys, resolve));

// ---------- 슬립 로그 ----------
const addSleepLog = async (entry) => {
  const { [STORAGE_KEYS.SLEEP_LOG]: log = [] } = await getStorage(STORAGE_KEYS.SLEEP_LOG);
  log.unshift({ ...entry, timestamp: Date.now() });
  if (log.length > MAX_SLEEP_LOG) log.length = MAX_SLEEP_LOG;
  await setStorage({ [STORAGE_KEYS.SLEEP_LOG]: log });
};

// ---------- YTM 탭 찾기/생성 ----------
const findYtmTab = () =>
  new Promise((resolve) =>
    chrome.tabs.query({ url: YTM_URL_PATTERN }, (tabs) => resolve(tabs[0] || null))
  );

const sendToYtm = async (message) => {
  const tab = await findYtmTab();
  if (!tab) return { success: false, error: 'YTM_TAB_NOT_FOUND' };
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tab.id, message, (resp) => {
      if (chrome.runtime.lastError) {
        resolve({ success: false, error: 'SEND_FAILED', detail: chrome.runtime.lastError.message });
      } else {
        resolve(resp);
      }
    });
  });
};

// ---------- 배지 ----------
const setBadge = (text, color = '#3EA6FF') => {
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text });
};
const clearBadge = () => chrome.action.setBadgeText({ text: '' });

// ---------- 슬립 타이머 ----------
const setSleepTimer = async ({ minutes, fadeOutEnabled = true }) => {
  const m = Number(minutes);
  if (!Number.isFinite(m) || m < 1 || m > 480) {
    return { success: false, error: 'INVALID_MINUTES', value: minutes };
  }

  const endTime = Date.now() + m * 60 * 1000;

  // 기존 타이머 해제
  await cancelSleepTimer({ silent: true });

  // 종료 알람
  chrome.alarms.create(ALARM.SLEEP_END, { when: endTime });

  // 페이드아웃 알람 (30초 전)
  if (fadeOutEnabled) {
    const fadeWhen = endTime - FADE_OUT_DURATION_MS;
    if (fadeWhen > Date.now()) {
      chrome.alarms.create(ALARM.SLEEP_FADE, { when: fadeWhen });
    }
  }

  // 배지 주기 업데이트 (매분)
  chrome.alarms.create(ALARM.SLEEP_BADGE, {
    when: Date.now() + 1000,
    periodInMinutes: 1,
  });

  await setStorage({
    [STORAGE_KEYS.SLEEP_TIMER]: { active: true, endTime, fadeOutEnabled },
  });

  await addSleepLog({ type: 'start', minutes: m, fadeOutEnabled });
  updateSleepBadge(endTime);
  return { success: true, endTime };
};

const cancelSleepTimer = async ({ silent = false } = {}) => {
  await Promise.all([
    new Promise((r) => chrome.alarms.clear(ALARM.SLEEP_END, () => r())),
    new Promise((r) => chrome.alarms.clear(ALARM.SLEEP_FADE, () => r())),
    new Promise((r) => chrome.alarms.clear(ALARM.SLEEP_BADGE, () => r())),
  ]);
  clearBadge();
  await setStorage({
    [STORAGE_KEYS.SLEEP_TIMER]: { active: false, endTime: null, fadeOutEnabled: true },
  });
  if (!silent) await addSleepLog({ type: 'canceled' });
  return { success: true, silent };
};

const updateSleepBadge = (endTime) => {
  const remainMs = endTime - Date.now();
  if (remainMs <= 0) {
    clearBadge();
    return;
  }
  const remainMin = Math.ceil(remainMs / 60000);
  const text = remainMin >= 60 ? `${Math.ceil(remainMin / 60)}h` : `${remainMin}`;
  setBadge(text);
};

// ---------- 알람 재생 ----------
const ensureAlarmCheckScheduled = async () => {
  const { [STORAGE_KEYS.ALARMS]: alarms = [] } = await getStorage(STORAGE_KEYS.ALARMS);
  const anyEnabled = alarms.some((a) => a.enabled);
  const existing = await new Promise((r) => chrome.alarms.get(ALARM.ALARM_CHECK, r));
  if (anyEnabled && !existing) {
    chrome.alarms.create(ALARM.ALARM_CHECK, { periodInMinutes: 1, when: Date.now() + 1000 });
  } else if (!anyEnabled && existing) {
    chrome.alarms.clear(ALARM.ALARM_CHECK);
  }
};

const checkAlarmsNow = async () => {
  const [{ [STORAGE_KEYS.ALARMS]: alarms = [] }, { [STORAGE_KEYS.PLAYLISTS]: playlists = [] }] =
    await Promise.all([
      getStorage(STORAGE_KEYS.ALARMS),
      getStorage(STORAGE_KEYS.PLAYLISTS),
    ]);

  const now = new Date();
  const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const day = now.getDay();

  const matches = alarms.filter(
    (a) => a.enabled && a.time === hhmm && Array.isArray(a.days) && a.days.includes(day)
  );
  if (matches.length === 0) return;

  // 중복 트리거 방지: 같은 분에 이미 실행된 알람 건너뛰기
  const nowMinuteKey = `${hhmm}_${day}_${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
  const { [STORAGE_KEYS.LAST_ALARM_TRIGGER]: lastTrigger } = await getStorage(STORAGE_KEYS.LAST_ALARM_TRIGGER);
  if (lastTrigger === nowMinuteKey) return;

  // 여러 개 매칭 시 첫 번째만 처리 (현실적 충돌 회피)
  const alarm = matches[0];
  const playlist = playlists.find((p) => p.id === alarm.playlistId);
  if (!playlist) return;

  await setStorage({ [STORAGE_KEYS.LAST_ALARM_TRIGGER]: nowMinuteKey });

  await triggerPlayback({
    playlistUrl: playlist.url,
    shuffle: alarm.shuffle,
    volume: alarm.volume,
  });
};

const triggerPlayback = async ({ playlistUrl, shuffle, volume }) => {
  let tab = await findYtmTab();

  if (!tab) {
    tab = await new Promise((r) =>
      chrome.tabs.create({ url: playlistUrl, active: false }, r)
    );
  } else {
    chrome.tabs.update(tab.id, { url: playlistUrl });
  }

  // 탭 로드 완료까지 대기: onUpdated 리스너에서 실행될 수 있도록 storage에 pending 상태 저장
  await setStorage({
    [PENDING_PLAYBACK_KEY]: {
      tabId: tab.id,
      playlistUrl,
      shuffle: !!shuffle,
      volume: Number(volume) || 50,
      createdAt: Date.now(),
    },
  });
};

const executePendingPlayback = async (tabId) => {
  const { [PENDING_PLAYBACK_KEY]: pending } = await getStorage(PENDING_PLAYBACK_KEY);
  if (!pending || pending.tabId !== tabId) return;
  // pending 만료 (10분)
  if (Date.now() - pending.createdAt > 10 * 60 * 1000) {
    await removeStorage(PENDING_PLAYBACK_KEY);
    return;
  }

  await removeStorage(PENDING_PLAYBACK_KEY);

  const send = (message) =>
    new Promise((resolve) =>
      chrome.tabs.sendMessage(tabId, message, (resp) => {
        if (chrome.runtime.lastError) {
          resolve({ success: false, error: chrome.runtime.lastError.message });
        } else resolve(resp);
      })
    );

  const r1 = await send({ type: MSG_SW_TO_CS.SET_SHUFFLE, payload: { enabled: pending.shuffle } });
  const r3 = await send({ type: MSG_SW_TO_CS.PLAY });
  // 볼륨 점진 증가: 0에서 목표 볼륨까지 서서히 올림 (기상 알람)
  const r2 = await send({ type: MSG_SW_TO_CS.FADE_IN, payload: { targetVolume: pending.volume, duration: FADE_IN_DURATION_MS } });
  if (!r1?.success || !r2?.success || !r3?.success) {
    await recordError('ALARM_PLAYBACK', { r1, r2, r3 });
  }
};

// ---------- 라이브러리 가져오기 ----------
const LIBRARY_URL = 'https://music.youtube.com/library/playlists';

const waitForTabComplete = (tabId, timeoutMs = 15000) =>
  new Promise((resolve) => {
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      chrome.tabs.onUpdated.removeListener(listener);
      clearTimeout(timer);
      resolve(ok);
    };
    const listener = (id, info) => {
      if (id === tabId && info.status === 'complete') finish(true);
    };
    chrome.tabs.onUpdated.addListener(listener);
    const timer = setTimeout(() => finish(false), timeoutMs);
    chrome.tabs.get(tabId, (tab) => {
      if (tab && tab.status === 'complete') finish(true);
    });
  });

const importPlaylists = async () => {
  let tab = await findYtmTab();
  if (!tab) {
    tab = await new Promise((r) =>
      chrome.tabs.create({ url: LIBRARY_URL, active: true }, r)
    );
  } else {
    const needsNavigate = !(tab.url || '').includes('/library/playlists');
    if (needsNavigate) {
      await new Promise((r) =>
        chrome.tabs.update(tab.id, { url: LIBRARY_URL, active: true }, r)
      );
    } else {
      chrome.tabs.update(tab.id, { active: true });
    }
  }

  await waitForTabComplete(tab.id, 15000);
  // SPA 렌더링 시간 확보 (content-script 자체 polling도 있음)
  await new Promise((r) => setTimeout(r, 800));

  return new Promise((resolve) => {
    chrome.tabs.sendMessage(
      tab.id,
      { type: MSG_SW_TO_CS.GET_PLAYLISTS },
      (resp) => {
        if (chrome.runtime.lastError) {
          resolve({ success: false, error: chrome.runtime.lastError.message });
        } else {
          resolve(resp || { success: false, error: 'NO_RESPONSE' });
        }
      }
    );
  });
};

const openYtm = async () => {
  const tab = await findYtmTab();
  if (tab) {
    await new Promise((r) =>
      chrome.tabs.update(tab.id, { active: true }, r)
    );
    chrome.windows.update(tab.windowId, { focused: true });
    return { success: true, tabId: tab.id, existed: true };
  }
  const created = await new Promise((r) =>
    chrome.tabs.create({ url: 'https://music.youtube.com/', active: true }, r)
  );
  return { success: true, tabId: created.id, existed: false };
};

// ---------- 알람 CRUD ----------
const upsertAlarm = async (alarm) => {
  if (!alarm || !alarm.id || !alarm.time || !Array.isArray(alarm.days)) {
    return { success: false, error: 'INVALID_ALARM' };
  }
  const { [STORAGE_KEYS.ALARMS]: alarms = [] } = await getStorage(STORAGE_KEYS.ALARMS);
  const idx = alarms.findIndex((a) => a.id === alarm.id);
  if (idx >= 0) alarms[idx] = { ...alarms[idx], ...alarm };
  else {
    if (alarms.length >= MAX_ALARMS) return { success: false, error: 'MAX_ALARMS_REACHED' };
    alarms.push({ enabled: true, ...alarm });
  }
  await setStorage({ [STORAGE_KEYS.ALARMS]: alarms });
  await ensureAlarmCheckScheduled();
  return { success: true, alarms };
};

const toggleAlarm = async ({ id, enabled }) => {
  const { [STORAGE_KEYS.ALARMS]: alarms = [] } = await getStorage(STORAGE_KEYS.ALARMS);
  const idx = alarms.findIndex((a) => a.id === id);
  if (idx < 0) return { success: false, error: 'ALARM_NOT_FOUND' };
  alarms[idx].enabled = !!enabled;
  await setStorage({ [STORAGE_KEYS.ALARMS]: alarms });
  await ensureAlarmCheckScheduled();
  return { success: true, alarm: alarms[idx] };
};

const deleteAlarm = async ({ id }) => {
  const { [STORAGE_KEYS.ALARMS]: alarms = [] } = await getStorage(STORAGE_KEYS.ALARMS);
  const next = alarms.filter((a) => a.id !== id);
  await setStorage({ [STORAGE_KEYS.ALARMS]: next });
  await ensureAlarmCheckScheduled();
  return { success: true, alarms: next };
};

// ---------- 상태 조회 ----------
const computeNextAlarm = (alarms) => {
  const enabled = alarms.filter((a) => a.enabled && Array.isArray(a.days) && a.days.length > 0);
  if (enabled.length === 0) return null;

  const now = new Date();
  let best = null;
  for (const a of enabled) {
    const [h, m] = a.time.split(':').map(Number);
    for (let offset = 0; offset < 8; offset += 1) {
      const cand = new Date(now);
      cand.setDate(now.getDate() + offset);
      cand.setHours(h, m, 0, 0);
      if (cand.getTime() <= now.getTime()) continue;
      if (!a.days.includes(cand.getDay())) continue;
      if (!best || cand.getTime() < best.time) {
        best = { id: a.id, time: cand.getTime(), iso: cand.toISOString() };
      }
      break;
    }
  }
  return best;
};

const getStatus = async () => {
  const data = await getStorage([STORAGE_KEYS.SLEEP_TIMER, STORAGE_KEYS.ALARMS, LAST_ERROR_KEY]);
  const sleep = data[STORAGE_KEYS.SLEEP_TIMER] || { active: false, endTime: null };
  const alarms = data[STORAGE_KEYS.ALARMS] || [];
  const lastError = data[LAST_ERROR_KEY] || null;
  if (lastError) await removeStorage(LAST_ERROR_KEY);
  const tab = await findYtmTab();
  return {
    success: true,
    sleepTimer: {
      active: !!sleep.active,
      endTime: sleep.endTime,
      remainingMs: sleep.active && sleep.endTime ? Math.max(0, sleep.endTime - Date.now()) : 0,
    },
    alarms,
    nextAlarm: computeNextAlarm(alarms),
    lastError,
    ytmTab: tab ? { id: tab.id, url: tab.url, title: tab.title } : null,
  };
};

// ---------- 메시지 라우터 ----------
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      switch (message?.type) {
        case MSG_POPUP_TO_SW.SET_SLEEP_TIMER:
          sendResponse(await setSleepTimer(message.payload || {}));
          break;
        case MSG_POPUP_TO_SW.CANCEL_SLEEP_TIMER:
          sendResponse(await cancelSleepTimer());
          break;
        case MSG_POPUP_TO_SW.SET_ALARM:
          sendResponse(await upsertAlarm(message.payload));
          break;
        case MSG_POPUP_TO_SW.TOGGLE_ALARM:
          sendResponse(await toggleAlarm(message.payload || {}));
          break;
        case MSG_POPUP_TO_SW.DELETE_ALARM:
          sendResponse(await deleteAlarm(message.payload || {}));
          break;
        case MSG_POPUP_TO_SW.GET_STATUS:
          sendResponse(await getStatus());
          break;
        case MSG_POPUP_TO_SW.IMPORT_PLAYLISTS:
          sendResponse(await importPlaylists());
          break;
        case MSG_POPUP_TO_SW.OPEN_YTM:
          sendResponse(await openYtm());
          break;
        case MSG_POPUP_TO_SW.GET_NOW_PLAYING: {
          const tab = await findYtmTab();
          if (!tab) { sendResponse({ success: false, error: 'NO_YTM_TAB' }); break; }
          sendResponse(await sendToYtm({ type: MSG_SW_TO_CS.GET_STATE }));
          break;
        }
        case MSG_POPUP_TO_SW.CONTROL: {
          // message.payload = { type: 'PLAY'|'PAUSE'|'SET_VOLUME', ... }
          const tab = await findYtmTab();
          if (!tab) { sendResponse({ success: false, error: 'NO_YTM_TAB' }); break; }
          sendResponse(await sendToYtm(message.payload));
          break;
        }
        case MSG_CS_TO_SW.STATE_PUSH:
          // content-script 상태 푸시 — storage에 이미 캐시됨, 별도 처리 불요
          sendResponse({ success: true });
          break;
        case MSG_POPUP_TO_SW.GET_SLEEP_LOG: {
          const { [STORAGE_KEYS.SLEEP_LOG]: log = [] } = await getStorage(STORAGE_KEYS.SLEEP_LOG);
          sendResponse({ success: true, log });
          break;
        }
        case MSG_POPUP_TO_SW.CLEAR_SLEEP_LOG:
          await setStorage({ [STORAGE_KEYS.SLEEP_LOG]: [] });
          sendResponse({ success: true });
          break;
        default:
          sendResponse({ success: false, error: 'UNKNOWN_MESSAGE_TYPE', type: message?.type });
      }
    } catch (err) {
      sendResponse({ success: false, error: 'EXCEPTION', message: String(err) });
    }
  })();
  return true;
});

// ---------- 알람 트리거 ----------
chrome.alarms.onAlarm.addListener(async (alarm) => {
  switch (alarm.name) {
    case ALARM.SLEEP_END: {
      const r = await sendToYtm({ type: MSG_SW_TO_CS.PAUSE });
      if (!r?.success) await recordError('SLEEP_END_PAUSE', r);
      await addSleepLog({ type: 'end', result: r?.success ? 'success' : 'failed', error: r?.success ? null : (r?.error || 'UNKNOWN') });
      await cancelSleepTimer({ silent: true });
      break;
    }
    case ALARM.SLEEP_FADE: {
      const r = await sendToYtm({
        type: MSG_SW_TO_CS.FADE_OUT,
        payload: { duration: FADE_OUT_DURATION_MS },
      });
      if (!r?.success) await recordError('SLEEP_FADE', r);
      break;
    }
    case ALARM.SLEEP_BADGE: {
      const { [STORAGE_KEYS.SLEEP_TIMER]: st } = await getStorage(STORAGE_KEYS.SLEEP_TIMER);
      if (st && st.active && st.endTime) updateSleepBadge(st.endTime);
      else clearBadge();
      break;
    }
    case ALARM.ALARM_CHECK: {
      await checkAlarmsNow();
      break;
    }
    default:
      break;
  }
});

// ---------- 탭 로드 완료 감지 → pending 재생 실행 ----------
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;
  const { [PENDING_PLAYBACK_KEY]: pending } = await getStorage(PENDING_PLAYBACK_KEY);
  if (!pending || pending.tabId !== tabId) return;
  // content-script의 waitForPlayer가 DOM 준비를 재확인하므로 짧은 지연만
  setTimeout(() => executePendingPlayback(tabId), 500);
});

// ---------- 설치/기동 시 초기화 ----------
chrome.runtime.onInstalled.addListener(async () => {
  // 기본 스토리지 초기화 (없을 때만)
  const data = await getStorage([STORAGE_KEYS.SLEEP_TIMER, STORAGE_KEYS.ALARMS, STORAGE_KEYS.PLAYLISTS, STORAGE_KEYS.SLEEP_LOG]);
  const patch = {};
  if (!data[STORAGE_KEYS.SLEEP_TIMER]) {
    patch[STORAGE_KEYS.SLEEP_TIMER] = { active: false, endTime: null, fadeOutEnabled: true };
  }
  if (!data[STORAGE_KEYS.ALARMS]) patch[STORAGE_KEYS.ALARMS] = [];
  if (!data[STORAGE_KEYS.PLAYLISTS]) patch[STORAGE_KEYS.PLAYLISTS] = [];
  if (!data[STORAGE_KEYS.SLEEP_LOG]) patch[STORAGE_KEYS.SLEEP_LOG] = [];
  if (Object.keys(patch).length) await setStorage(patch);
  await ensureAlarmCheckScheduled();
});

// 슬립 타이머 알람 재등록 (브라우저/SW 재시작 시)
const restoreSleepTimer = async () => {
  const { [STORAGE_KEYS.SLEEP_TIMER]: st } = await getStorage(STORAGE_KEYS.SLEEP_TIMER);
  if (!st || !st.active || !st.endTime) {
    clearBadge();
    return;
  }
  if (st.endTime <= Date.now()) {
    // 이미 만료된 타이머 → 정리
    await cancelSleepTimer({ silent: true });
    return;
  }
  // chrome.alarms가 존재하지 않으면 재등록 (idempotent)
  const ensure = (name, opts) =>
    new Promise((r) =>
      chrome.alarms.get(name, (existing) => {
        if (!existing) chrome.alarms.create(name, opts);
        r();
      })
    );

  await ensure(ALARM.SLEEP_END, { when: st.endTime });
  if (st.fadeOutEnabled && st.endTime - FADE_OUT_DURATION_MS > Date.now()) {
    await ensure(ALARM.SLEEP_FADE, { when: st.endTime - FADE_OUT_DURATION_MS });
  }
  await ensure(ALARM.SLEEP_BADGE, { when: Date.now() + 1000, periodInMinutes: 1 });
  updateSleepBadge(st.endTime);
};

chrome.runtime.onStartup.addListener(async () => {
  await restoreSleepTimer();
  await ensureAlarmCheckScheduled();
});

// SW 최초 활성화 시(onInstalled 이후 재기동 포함) 복원
(async () => {
  try {
    await restoreSleepTimer();
    await ensureAlarmCheckScheduled();
  } catch (err) {
    await recordError('SW_BOOT', String(err));
  }
})();
