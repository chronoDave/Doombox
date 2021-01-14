module.exports = {
  IPC: {
    CHANNEL: {
      WINDOW: 'IPC_CHANNEL_WINDOW',
      LIBRARY: 'IPC_CHANNEL_LIBRARY',
      IMAGE: 'IPC_CHANNEL_IMAGE',
      SONG: 'IPC_CHANNEL_SONG',
      ALBUM: 'IPC_CHANNEL_ALBUM',
      LABEL: 'IPC_CHANNEL_LABEL',
      THEME: 'IPC_CHANNEL_THEME',
      CACHE: 'IPC_CHANNEL_CACHE',
      CONFIG: 'IPC_CHANNEL_CONFIG',
      KEYBIND: 'IPC_CHANNEL_KEYBIND',
      OVERLAY: 'IPC_CHANNEL_OVERLAY',
      SCAN: 'IPC_CHANNEL_SCAN',
      AUDIO: 'IPC_CHANNEL_AUDIO',
      ERROR: 'IPC_CHANNEL_ERROR'
    },
    ACTION: {
      INSERT: 'IPC_ACTION_INSERT',
      FIND: 'IPC_ACTION_FIND',
      FIND_BY_ID: 'IPC_ACTION_FINDBYID',
      UPDATE: 'IPC_ACTION_UPDATE',
      UPDATE_BY_ID: 'IPC_ACTION_UPDATEBYID',
      DELETE: 'IPC_ACTION_DELETE',
      DELETE_BY_ID: 'IPC_ACTION_DELETEBYID',
      DROP: 'IPC_ACTION_DROP',
      MENU: {
        SCAN_FOLDER: 'IPC_ACTION_MENU_SCAN',
        RESCAN: 'IPC_ACTION_MENU_RESCAN',
        DELETE_LIBRARY: 'IPC_ACTION_MENU_DELETE'
      },
      WINDOW: {
        SET_TITLE: 'IPC_ACTION_WINDOW_TITLE',
        MINIMIZE: 'IPC_ACTION_WINDOW_MINIMIZE',
        MAXIMIZE: 'IPC_ACTION_WINDOW_MAXIMIZE',
        CLOSE: 'IPC_ACTION_WINDOW_CLOSE',
        SET_THUMBAR: 'IPC_ACTION_WINDOW_THUMBAR'
      },
      AUDIO: {
        PAUSE: 'IPC_ACTION_AUDIO_PAUSE',
        STOP: 'IPC_ACTION_AUDIO_STOP',
        NEXT: 'IPC_ACTION_AUDIO_NEXT',
        PREVIOUS: 'IPC_ACTION_AUDIO_PREVIOUS',
        VOLUME_UP: 'IPC_ACTION_AUDIO_VOLUME_UP',
        VOLUME_DOWN: 'IPC_ACTION_AUDIO_VOLUME_DOWN',
        MUTE: 'IPC_ACTION_AUDIO_MUTE'
      }
    }
  },
  EVENTS: {
    AUDIO: {
      POSITION: 'EVENT_AUDIO_POSITION',
      VOLUME: 'EVENT_AUDIO_VOLUME',
      MUTED: 'EVENT_AUDIO_MUTED',
      PLAYLIST: 'EVENT_AUDIO_PLAYLIST',
      METADATA: 'EVENT_AUDIO_METADATA',
      STATUS: 'EVENT_AUDIO_STATUS',
      INDEX: 'EVENT_AUDIO_INDEX'
    }
  },
  STATUS: {
    AUDIO: {
      PLAYING: 'STATUS_AUDIO_PLAYING',
      PAUSED: 'STATUS_AUDIO_PAUSED',
      STOPPED: 'STATUS_AUDIO_STOPPED'
    }
  },
  WINDOW: {
    VIEW: {
      LIBRARY: 'WINDOW_VIEW_LIBRARY',
      SEARCH: 'WINDOW_VIEW_SEARCH'
    },
    OVERLAY: {
      SCAN: 'WINDOW_OVERLAY_SCAN',
      SETTINGS: 'WINDOW_OVERLAY_SETTINGS'
    },
    TABS: {
      SONGS: 'song',
      ALBUMS: 'album',
      LABELS: 'label'
    }
  },
  URLS: {
    REPO: 'https://github.com/chronoDave/Doombox',
    KEYBINDS: 'https://github.com/chronoDave/Doombox/tree/master/docs/KEYBIND.md',
    REPORT_ISSUE: 'https://github.com/chronoDave/Doombox/issues/new'
  },
  TAGS: [
    'ID3v1',
    'ID3v1.1',
    'ID3v2.2',
    'ID3v2.3',
    'ID3v2.4'
  ],
  TYPES: {
    DATABASE: {
      SONGS: 'songs',
      LABELS: 'labels',
      ALBUMS: 'albums',
      IMAGES: 'images'
    },
    CACHE: {
      WINDOW: 'window',
      PLAYER: 'player',
      FOLDERS: 'folders',
      TABS: 'tabs'
    },
    CONFIG: {
      DISPLAY: 'display',
      PARSER: 'parser',
      PLAYER: 'player',
      KEYBINDS: 'keybinds',
      SEARCH: 'search'
    }
  }
};
