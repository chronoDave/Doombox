const TYPE = {
  IPC: {
    KEYBIND: 'Keybind',
    LIBRARY: 'Library',
    PLAYLIST: 'Playlist',
    CONFIG: {
      USER: 'ConfigUser',
      SYSTEM: 'ConfigSystem'
    },
    RPC: 'Rpc',
    CACHE: 'Cache',
    MESSAGE: 'Message',
    INTERRUPT: 'Interrupt',
    IMAGE: 'Image'
  },
  CONFIG: {
    GENERAL: 'general',
    KEYBIND: 'keybind',
    PALETTE: 'palette',
    PLAYER: 'player',
    PARSER: 'parser',
    DISCORD: 'discord',
    SEARCH: 'search',
    LIBRARY: 'library',
    DIMENSIONS: 'dimensions',
    POSITION: 'position'
  },
  OPTIONS: {
    DENSE: 'dense',
    SLOW_SEARCH: 'slowSearch',
    TOKEN: 'token',
    KEY_IMAGE: 'imageKey',
    BACKGROUND: 'background',
    FOLDERS: 'folders',
    HARDWARE_ACCELERATION: 'hardwareAcceleration',
    FORCE_QUIT: 'forceQuit',
    SKIP_COVERS: 'skipCovers',
    PATH_IMAGE: 'pathImage',
    FILE_FORMATS: 'fileFormats',
    GLOB: 'glob',
    PARSE_STRICT: 'parseStrict',
    PAGE: 'page'
  },
  ID: {
    WINDOW_MINIMIZE: 'window-minimize',
    WINDOW_MAXIMIZE: 'window-maximize',
    WINDOW_CLOSE: 'window-close'
  }
};

const ACTION = {
  AUDIO: {
    NEXT: 'NEXT',
    PREVIOUS: 'PREVIOUS',
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    STOP: 'STOP',
    VOLUME_UP: 'VOLUME_UP',
    VOLUME_DOWN: 'VOLUME_DOWN',
    MUTE: 'MUTE'
  },
  CRUD: {
    CREATE: 'CREATE',
    READ: 'READ',
    READ_ONE: 'READ_ONE',
    UPDATE: 'UPDATE',
    UPDATE_ONE: 'UPDATE_ONE',
    DELETE: 'DELETE',
    DELETE_ONE: 'DELETE_ONE',
    DROP: 'DROP',
    COUNT: 'COUNT'
  },
  INTERRUPT: {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
  }
};

module.exports = {
  TYPE,
  ACTION
};
