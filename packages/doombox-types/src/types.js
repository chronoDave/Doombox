const TYPES = {
  DATABASE: {
    LIBRARY: 'library',
    IMAGES: 'images'
  },
  CACHE: {
    WINDOW: 'window',
    VOLUME: 'volume',
    FOLDERS: 'folders'
  },
  CONFIG: {
    PARSER: 'parser',
    PLAYER: 'player',
    KEYBINDS: 'keybinds'
  }
};

const MENUS = {
  FILE: {
    RESCAN_LIBRARY: 'Rescan Library',
    SCAN_FOLDER: 'Scan Folder...',
    DELETE_LIBRARY: 'Delete Library',
    EXIT: 'Exit'
  },
  HELP: {
    TOGGLE_DEV_TOOLS: 'Toggle Developer Tools',
    OPEN_GITHUB: 'Open GitHub',
    REPORT_ISSUE: 'Report Issue'
  }
};

const URLS = {
  [MENUS.HELP.OPEN_GITHUB]: 'https://github.com/chronoDave/Doombox',
  [MENUS.HELP.REPORT_ISSUE]: 'https://github.com/chronoDave/Doombox/issues/new'
};

const STATUS = {
  AUDIO: {
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    STOPPED: 'STOPPED'
  }
};

const EVENTS = {
  AUDIO: {
    POSITION: 'POSITION',
    VOLUME: 'VOLUME',
    MUTED: 'MUTED',
    PLAYLIST: 'PLAYLIST',
    DURATION: 'DURATION',
    METADATA: 'METADATA',
    STATUS: 'STATUS'
  }
};

const IPC = {
  CHANNEL: {
    WINDOW: 'WINDOW',
    LIBRARY: 'LIBRARY',
    THEME: 'THEME',
    CACHE: 'CACHE',
    CONFIG: 'CONFIG',
    KEYBIND: 'KEYBIND'
  },
  ACTION: {
    INSERT: 'INSERT',
    FIND: 'FIND',
    FIND_BY_ID: 'FIND_BY_ID',
    UPDATE: 'UPDATE',
    UPDATE_BY_ID: 'UPDATE_BY_ID',
    DELETE: 'DELETE',
    DELETE_BY_ID: 'DELETE_BY_ID',
    DROP: 'DROP',
    MENU: {
      SCAN_FOLDER: 'SCAN',
      RESCAN: 'RESCAN',
      DELETE_LIBRARY: 'DELETE_LIBRARY'
    },
    WINDOW: {
      SET_TITLE: 'SET_TITLE',
      MINIMIZE: 'MINIMIZE',
      MAXIMIZE: 'MAXIMIZE',
      CLOSE: 'CLOSE',
      SET_THUMBAR: 'SET_THUMBAR'
    },
    AUDIO: {
      PLAY: 'PLAY',
      PAUSE: 'PAUSE',
      STOP: 'STOP',
      NEXT: 'NEXT',
      PREVIOUS: 'PREVIOUS',
      VOLUME_UP: 'VOLUME_UP',
      VOLUME_DOWN: 'VOLUME_DOWN',
      MUTE: 'MUTE'
    },
  }
};

module.exports = {
  TYPES,
  STATUS,
  URLS,
  EVENTS,
  MENUS,
  IPC,
};
