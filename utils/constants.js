// 메시지 타입: popup → service-worker
const MSG_POPUP_TO_SW = {
  SET_SLEEP_TIMER: 'SET_SLEEP_TIMER',
  CANCEL_SLEEP_TIMER: 'CANCEL_SLEEP_TIMER',
  SET_ALARM: 'SET_ALARM',
  TOGGLE_ALARM: 'TOGGLE_ALARM',
  DELETE_ALARM: 'DELETE_ALARM',
  GET_STATUS: 'GET_STATUS',
  IMPORT_PLAYLISTS: 'IMPORT_PLAYLISTS',
  OPEN_YTM: 'OPEN_YTM',
  GET_NOW_PLAYING: 'GET_NOW_PLAYING',
  CONTROL: 'CONTROL',
  // v1.1 추가
  GET_SLEEP_LOG: 'GET_SLEEP_LOG',
  CLEAR_SLEEP_LOG: 'CLEAR_SLEEP_LOG',
  SAVE_CURRENT_PLAYLIST: 'SAVE_CURRENT_PLAYLIST',
};

// 메시지 타입: service-worker → content-script
const MSG_SW_TO_CS = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  SET_VOLUME: 'SET_VOLUME',
  FADE_OUT: 'FADE_OUT',
  FADE_IN: 'FADE_IN',
  SET_SHUFFLE: 'SET_SHUFFLE',
  SET_REPEAT: 'SET_REPEAT',
  GET_STATE: 'GET_STATE',
  GET_PLAYLISTS: 'GET_PLAYLISTS',
  GET_CURRENT_URL: 'GET_CURRENT_URL',
};

// 메시지 타입: content-script → service-worker (응답/푸시)
const MSG_CS_TO_SW = {
  STATE: 'STATE',
  STATE_PUSH: 'STATE_PUSH',
};

// YouTube Music DOM 셀렉터
const YTM_SELECTORS = {
  playPauseButton: '#play-pause-button',
  volumeSlider: '#volume-slider',
  shuffleButton: '.shuffle.ytmusic-player-bar',
  repeatButton: '.repeat.ytmusic-player-bar',
  playerBar: 'ytmusic-player-bar',
  songTitle: '.title.ytmusic-player-bar',
  artistByline: '.byline.ytmusic-player-bar',
  thumbnailImage: 'ytmusic-player-bar img.image',
};

// chrome.storage.local 키
const STORAGE_KEYS = {
  SLEEP_TIMER: 'sleepTimer',
  ALARMS: 'alarms',
  PLAYLISTS: 'playlists',
  SLEEP_LOG: 'sleepLog',
  DARK_MODE: 'darkMode',
  LAST_ALARM_TRIGGER: 'lastAlarmTrigger',
  FADE_ORIGINAL_VOLUME: 'fadeOriginalVolume',
  NOW_PLAYING_CACHE: 'nowPlayingCache',
};

// 설정 기본값
const SLEEP_TIMER_PRESETS = [15, 30, 60, 120]; // 분
const MAX_ALARMS = 5;
const MAX_PLAYLISTS = 20;
const MAX_SLEEP_LOG = 50;
const FADE_OUT_DURATION_MS = 30000;
const FADE_IN_DURATION_MS = 60000; // 1분간 볼륨 점진 증가
