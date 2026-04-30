// YouTube Music DOM 제어 계층
// constants.js가 먼저 로드되어 YTM_SELECTORS, MSG_SW_TO_CS 등이 전역으로 존재

(() => {
  let fadeOutIntervalId = null;
  let fadeInIntervalId = null;
  let observerAttached = false;

  // ---------- 유틸 ----------

  const errResp = (selector) => ({
    success: false,
    error: 'SELECTOR_NOT_FOUND',
    selector,
  });

  const isPlayerReady = () => !!document.querySelector(YTM_SELECTORS.playerBar);

  // 플레이어 준비될 때까지 최대 10초 대기 (1초 간격)
  const waitForPlayer = () =>
    new Promise((resolve) => {
      if (isPlayerReady()) return resolve(true);
      let tries = 0;
      const timer = setInterval(() => {
        tries += 1;
        if (isPlayerReady()) {
          clearInterval(timer);
          resolve(true);
        } else if (tries >= 10) {
          clearInterval(timer);
          resolve(false);
        }
      }, 1000);
    });

  // <video> 엘리먼트 — YTM의 실제 미디어 (가장 신뢰 가능)
  const getVideo = () => document.querySelector('video');

  // 재생 상태 판별: video.paused가 가장 정확. 폴백: 버튼 라벨
  const getIsPlaying = (btn) => {
    const v = getVideo();
    if (v && Number.isFinite(v.duration)) return !v.paused;
    const label = (btn.getAttribute('title') || btn.getAttribute('aria-label') || '').toLowerCase();
    if (label.includes('일시중지') || label.includes('pause') || label.includes('一時停止')) return true;
    if (label.includes('재생') || label.includes('play') || label.includes('再生')) return false;
    return null;
  };

  // 볼륨: video.volume 우선, 슬라이더 폴백
  const getVolume = (slider) => {
    const v = getVideo();
    if (v && Number.isFinite(v.volume)) return Math.round(v.volume * 100);
    const sv = slider?.value ?? slider?.getAttribute('value');
    const num = Number(sv);
    return Number.isFinite(num) ? num : null;
  };

  const setVolumeValue = (slider, value) => {
    const clamped = Math.max(0, Math.min(100, Math.round(value)));
    // 1) Polymer paper-slider
    if (slider) {
      try {
        slider.value = clamped;
        slider.setAttribute('value', String(clamped));
        slider.dispatchEvent(new CustomEvent('immediate-value-change', { bubbles: true }));
        slider.dispatchEvent(new CustomEvent('change', { bubbles: true }));
        slider.dispatchEvent(new CustomEvent('value-change', { bubbles: true }));
      } catch (_) {}
    }
    // 2) <video> 직접 — 실제 출력 보장
    const v = getVideo();
    if (v) {
      try { v.volume = clamped / 100; v.muted = clamped === 0; } catch (_) {}
    }
    return clamped;
  };

  // 트랙 정보 다중 셀렉터 폴백
  const getTrackInfo = () => {
    const q = (sels) => {
      for (const s of sels) {
        const el = document.querySelector(s);
        if (el) return el;
      }
      return null;
    };
    const titleEl = q([
      'ytmusic-player-bar .title.ytmusic-player-bar',
      'ytmusic-player-bar yt-formatted-string.title',
      'ytmusic-player-bar .content-info-wrapper .title',
    ]);
    const bylineEl = q([
      'ytmusic-player-bar .byline.ytmusic-player-bar',
      'ytmusic-player-bar yt-formatted-string.byline',
      'ytmusic-player-bar .subtitle yt-formatted-string',
    ]);
    const thumbEl = q([
      'ytmusic-player-bar .image img',
      'ytmusic-player-bar yt-img-shadow img',
      'ytmusic-player-bar img',
    ]);
    return {
      title: titleEl ? titleEl.textContent.trim() : '',
      artist: bylineEl ? bylineEl.textContent.trim() : '',
      thumbnail: thumbEl ? (thumbEl.src || thumbEl.getAttribute('src') || '') : '',
    };
  };

  // 셔플 버튼 상태 판별 (aria-pressed 또는 active 클래스)
  const getShuffleEnabled = (btn) => {
    const pressed = btn.getAttribute('aria-pressed');
    if (pressed === 'true') return true;
    if (pressed === 'false') return false;
    return btn.classList.contains('active');
  };

  // 반복 모드 판별: off / all / one
  const getRepeatMode = (btn) => {
    if (!btn) return null;
    const label = (btn.getAttribute('title') || btn.getAttribute('aria-label') || '').toLowerCase();
    if (label.includes('한 곡') || label.includes('one') || label.includes('1曲')) return 'one';
    if (label.includes('전체') || label.includes('all') || label.includes('全曲')) return 'all';
    // aria-pressed 기반 폴백
    const pressed = btn.getAttribute('aria-pressed');
    if (pressed === 'true') return 'all';
    return 'off';
  };

  // ---------- 핸들러 ----------

  const handlePlay = () => {
    const btn = document.querySelector(YTM_SELECTORS.playPauseButton);
    if (!btn) return errResp(YTM_SELECTORS.playPauseButton);
    const playing = getIsPlaying(btn);
    if (playing === false) btn.click();
    return { success: true, action: playing === false ? 'clicked' : 'noop' };
  };

  const handlePause = () => {
    const btn = document.querySelector(YTM_SELECTORS.playPauseButton);
    if (!btn) return errResp(YTM_SELECTORS.playPauseButton);
    const playing = getIsPlaying(btn);
    if (playing === true) btn.click();
    if (fadeOutIntervalId !== null) {
      clearInterval(fadeOutIntervalId);
      fadeOutIntervalId = null;
    }
    if (fadeInIntervalId !== null) {
      clearInterval(fadeInIntervalId);
      fadeInIntervalId = null;
    }
    return { success: true, action: playing === true ? 'clicked' : 'noop' };
  };

  const handleSetVolume = (payload) => {
    const slider = document.querySelector(YTM_SELECTORS.volumeSlider);
    if (!slider) return errResp(YTM_SELECTORS.volumeSlider);
    const target = Number(payload?.volume);
    if (!Number.isFinite(target)) {
      return { success: false, error: 'INVALID_VOLUME', value: payload?.volume };
    }
    const applied = setVolumeValue(slider, target);
    return { success: true, volume: applied };
  };

  const handleFadeOut = (payload) => {
    const slider = document.querySelector(YTM_SELECTORS.volumeSlider);
    if (!slider) return errResp(YTM_SELECTORS.volumeSlider);
    const duration = Number(payload?.duration);
    if (!Number.isFinite(duration) || duration <= 0) {
      return { success: false, error: 'INVALID_DURATION', value: payload?.duration };
    }

    if (fadeOutIntervalId !== null) {
      clearInterval(fadeOutIntervalId);
      fadeOutIntervalId = null;
    }

    const startVolume = getVolume(slider) ?? 0;
    // 원래 볼륨 저장 (storage를 통해)
    try {
      chrome.storage.local.set({ [STORAGE_KEYS.FADE_ORIGINAL_VOLUME]: startVolume });
    } catch (_) {}

    const stepMs = 100;
    const totalSteps = Math.max(1, Math.floor(duration / stepMs));
    const stepDelta = startVolume / totalSteps;
    let currentStep = 0;

    fadeOutIntervalId = setInterval(() => {
      currentStep += 1;
      const next = Math.max(0, startVolume - stepDelta * currentStep);
      setVolumeValue(slider, next);
      if (currentStep >= totalSteps || next <= 0) {
        clearInterval(fadeOutIntervalId);
        fadeOutIntervalId = null;
        // 완료 후 일시정지
        const btn = document.querySelector(YTM_SELECTORS.playPauseButton);
        if (btn && getIsPlaying(btn) === true) btn.click();
        // 볼륨 복원
        setTimeout(() => setVolumeValue(slider, startVolume), 500);
      }
    }, stepMs);

    return { success: true, startVolume, durationMs: duration, steps: totalSteps };
  };

  // 볼륨 점진 증가 (알람 기상용)
  const handleFadeIn = (payload) => {
    const slider = document.querySelector(YTM_SELECTORS.volumeSlider);
    if (!slider) return errResp(YTM_SELECTORS.volumeSlider);
    const targetVolume = Number(payload?.targetVolume) || 50;
    const duration = Number(payload?.duration) || FADE_IN_DURATION_MS;

    if (fadeInIntervalId !== null) {
      clearInterval(fadeInIntervalId);
      fadeInIntervalId = null;
    }

    // 0에서 시작
    setVolumeValue(slider, 0);
    const stepMs = 200;
    const totalSteps = Math.max(1, Math.floor(duration / stepMs));
    const stepDelta = targetVolume / totalSteps;
    let currentStep = 0;

    fadeInIntervalId = setInterval(() => {
      currentStep += 1;
      const next = Math.min(targetVolume, stepDelta * currentStep);
      setVolumeValue(slider, next);
      if (currentStep >= totalSteps || next >= targetVolume) {
        clearInterval(fadeInIntervalId);
        fadeInIntervalId = null;
      }
    }, stepMs);

    return { success: true, targetVolume, durationMs: duration, steps: totalSteps };
  };

  const handleSetShuffle = (payload) => {
    const btn = document.querySelector(YTM_SELECTORS.shuffleButton);
    if (!btn) return errResp(YTM_SELECTORS.shuffleButton);
    const desired = !!payload?.enabled;
    const current = getShuffleEnabled(btn);
    if (current !== desired) btn.click();
    return { success: true, shuffle: desired, toggled: current !== desired };
  };

  // 반복 모드 설정: 'off' | 'all' | 'one'
  const handleSetRepeat = (payload) => {
    const btn = document.querySelector(YTM_SELECTORS.repeatButton);
    if (!btn) return errResp(YTM_SELECTORS.repeatButton);
    const desired = payload?.mode || 'all';
    const current = getRepeatMode(btn);
    if (current === desired) return { success: true, repeat: desired, clicks: 0 };
    // Cycle: off → all → one → off
    const order = ['off', 'all', 'one'];
    const ci = order.indexOf(current);
    const di = order.indexOf(desired);
    const clicks = ci >= 0 && di >= 0 ? (di - ci + 3) % 3 : 1;
    for (let i = 0; i < clicks; i++) btn.click();
    return { success: true, repeat: desired, clicks };
  };

  // 현재 URL 반환
  const handleGetCurrentUrl = () => ({
    success: true,
    url: location.href,
    pathname: location.pathname,
    isPlaylist: location.href.includes('playlist?list='),
  });

  // 라이브러리 플레이리스트 파싱
  const waitForAny = async (selectors, maxWaitMs = 6000, intervalMs = 300) => {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
      for (const sel of selectors) {
        const els = document.querySelectorAll(sel);
        if (els.length > 0) return { selector: sel, elements: els };
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }
    return { selector: null, elements: [] };
  };

  const handleGetPlaylists = async () => {
    try {
      await waitForAny(
        [
          'ytmusic-two-row-item-renderer',
          'ytmusic-responsive-list-item-renderer',
          'a[href^="/playlist?list="]',
        ],
        6000
      );

      const items = [];
      const seen = new Set();
      const push = (alias, href) => {
        if (!alias || !href) return;
        const abs = new URL(href, location.origin).href.split('&')[0];
        if (seen.has(abs)) return;
        seen.add(abs);
        items.push({ alias: alias.trim().slice(0, 80), url: abs });
      };

      document.querySelectorAll(
        'ytmusic-two-row-item-renderer, ytmusic-responsive-list-item-renderer'
      ).forEach((card) => {
        const link = card.querySelector('a[href*="playlist?list="]');
        if (!link) return;
        const titleEl =
          card.querySelector('.title') ||
          card.querySelector('yt-formatted-string.title') ||
          card.querySelector('yt-formatted-string');
        const alias = (titleEl?.textContent || link.getAttribute('aria-label') || '').trim();
        push(alias, link.getAttribute('href') || link.href);
      });

      if (items.length === 0) {
        document.querySelectorAll('a[href*="playlist?list="]').forEach((a) => {
          const href = a.getAttribute('href') || a.href;
          const alias =
            a.getAttribute('aria-label') ||
            a.getAttribute('title') ||
            a.textContent.trim();
          push(alias, href);
        });
      }

      if (items.length === 0) {
        return { success: false, error: 'NO_PLAYLISTS_FOUND', hint: location.pathname };
      }
      return { success: true, payload: items };
    } catch (err) {
      return { success: false, error: 'PARSE_FAILED', message: String(err) };
    }
  };

  const handleGetState = () => {
    const btn = document.querySelector(YTM_SELECTORS.playPauseButton);
    const slider = document.querySelector(YTM_SELECTORS.volumeSlider);
    const shuffleBtn = document.querySelector(YTM_SELECTORS.shuffleButton);
    const repeatBtn = document.querySelector(YTM_SELECTORS.repeatButton);
    const track = getTrackInfo();
    const v = getVideo();

    return {
      success: true,
      type: MSG_CS_TO_SW.STATE,
      payload: {
        isPlaying: btn ? getIsPlaying(btn) : null,
        volume: getVolume(slider),
        videoVolume: v ? Math.round(v.volume * 100) : null,
        videoMuted: v ? v.muted : null,
        shuffle: shuffleBtn ? getShuffleEnabled(shuffleBtn) : null,
        repeat: repeatBtn ? getRepeatMode(repeatBtn) : null,
        title: track.title,
        artist: track.artist,
        thumbnail: track.thumbnail,
        hasPlayer: !!btn,
        currentUrl: location.href,
      },
    };
  };

  // ---------- MutationObserver — 상태 변화 푸시 ----------

  const setupStateObserver = () => {
    if (observerAttached) return;
    observerAttached = true;

    let debounceTimer = null;
    const pushState = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const state = handleGetState();
        try {
          chrome.runtime.sendMessage({ type: MSG_CS_TO_SW.STATE_PUSH, payload: state.payload });
        } catch (_) {}
        // storage 캐시 업데이트 (팝업의 onChanged 리스너용)
        try {
          chrome.storage.local.set({ [STORAGE_KEYS.NOW_PLAYING_CACHE]: state.payload });
        } catch (_) {}
      }, 400);
    };

    const observer = new MutationObserver(pushState);
    const playerBar = document.querySelector(YTM_SELECTORS.playerBar);
    if (playerBar) {
      observer.observe(playerBar, { subtree: true, attributes: true, characterData: true, childList: true });
    }

    // video 이벤트 리스닝
    const attachVideoListeners = () => {
      const v = getVideo();
      if (v && !v._ytmObserved) {
        v._ytmObserved = true;
        v.addEventListener('play', pushState);
        v.addEventListener('pause', pushState);
        v.addEventListener('volumechange', pushState);
      }
    };
    attachVideoListeners();

    // video 재생성 대비
    const bodyObs = new MutationObserver(attachVideoListeners);
    bodyObs.observe(document.body, { childList: true, subtree: true });
  };

  // 초기화
  if (isPlayerReady()) {
    setupStateObserver();
  } else {
    waitForPlayer().then((ready) => { if (ready) setupStateObserver(); });
  }

  // ---------- 메시지 라우터 ----------

  const dispatch = (message) => {
    switch (message?.type) {
      case MSG_SW_TO_CS.PLAY:
        return handlePlay();
      case MSG_SW_TO_CS.PAUSE:
        return handlePause();
      case MSG_SW_TO_CS.SET_VOLUME:
        return handleSetVolume(message.payload);
      case MSG_SW_TO_CS.FADE_OUT:
        return handleFadeOut(message.payload);
      case MSG_SW_TO_CS.FADE_IN:
        return handleFadeIn(message.payload);
      case MSG_SW_TO_CS.SET_SHUFFLE:
        return handleSetShuffle(message.payload);
      case MSG_SW_TO_CS.SET_REPEAT:
        return handleSetRepeat(message.payload);
      case MSG_SW_TO_CS.GET_STATE:
        return handleGetState();
      case MSG_SW_TO_CS.GET_PLAYLISTS:
        return handleGetPlaylists();
      case MSG_SW_TO_CS.GET_CURRENT_URL:
        return handleGetCurrentUrl();
      default:
        return { success: false, error: 'UNKNOWN_MESSAGE_TYPE', type: message?.type };
    }
  };

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
      try {
        const noWait = (
          message?.type === MSG_SW_TO_CS.GET_PLAYLISTS ||
          message?.type === MSG_SW_TO_CS.GET_STATE ||
          message?.type === MSG_SW_TO_CS.GET_CURRENT_URL
        );
        if (!noWait) {
          const ready = await waitForPlayer();
          if (!ready) {
            sendResponse({ success: false, error: 'PLAYER_NOT_READY' });
            return;
          }
        }
        const result = await dispatch(message);
        sendResponse(result);
      } catch (err) {
        sendResponse({ success: false, error: 'EXCEPTION', message: String(err) });
      }
    })();
    return true;
  });
})();
