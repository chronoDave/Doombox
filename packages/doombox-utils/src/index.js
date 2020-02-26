const TYPE = {
  IPC: {
    KEYBIND: 'Keybind',
    LIBRARY: 'Library',
    PLAYLIST: 'Playlist',
    CONFIG: 'Config',
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
    ADVANCED: 'advanced',
    LIBRARY: 'library',
    DIMENSIONS: 'dimensions',
    POSITION: 'position'
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
    MUTE: 'MUTE',
    SHUFFLE: 'SHUFFLE',
    PLAYLIST_ADD: 'PLAYLIST_ADD',
    PLAYLIST_SET: 'PLAYLIST_SET'
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
  STATUS: {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
  }
};

const CONFIG = {
  [TYPE.CONFIG.GENERAL]: {
    dense: false,
    slowSearch: false,
    forceQuit: false,
    background: false,
    reverseScroll: true
  },
  [TYPE.CONFIG.ADVANCED]: {
    libraryCache: 25,
    hardwareAcceleration: true,
  },
  [TYPE.CONFIG.DISCORD]: {
    token: null,
    imageKey: null
  },
  [TYPE.CONFIG.KEYBIND]: {
    [ACTION.AUDIO.NEXT]: 'CommandOrControl+Alt+Right',
    [ACTION.AUDIO.PREVIOUS]: 'CommandOrControl+Alt+Left',
    [ACTION.AUDIO.PLAY]: 'CommandOrControl+Alt+\\',
    [ACTION.AUDIO.PAUSE]: null,
    [ACTION.AUDIO.STOP]: null,
    [ACTION.AUDIO.VOLUME_UP]: 'CommandOrControl+Alt+Up',
    [ACTION.AUDIO.VOLUME_DOWN]: 'CommandOrControl+Alt+Down',
    [ACTION.AUDIO.MUTE]: null
  },
  [TYPE.CONFIG.PALETTE]: {
    darkTheme: true,
    backgroundOpacity: true,
    primary: {
      main: '#664d82',
      dark: '#443555',
      light: '#9073ae',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f06292',
      dark: '#ba2d65',
      light: '#ff94c2',
      contrastText: '#ffffff'
    },
    error: {
      main: '#f04747',
      dark: '#b6001f',
      light: '#ff7c73',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#faa61a',
      dark: '#c27700',
      light: '#ffd753',
      contrastText: '#ffffff'
    },
    success: {
      main: '#43b581',
      dark: '#008454',
      light: '#78e8b1',
      contrastText: '#ffffff'
    },
    info: {
      main: '#3498db',
      dark: '#006aa9',
      light: '#73c9ff',
      contrastText: '#ffffff'
    },
    grey: {
      light: '#fafafa',
      dark: '#202225'
    },
    ramp: {
      50: 0,
      100: 0.02,
      200: 0.06,
      300: 0.11,
      400: 0.23,
      500: 0.45,
      600: 0.51,
      700: 0.59,
      800: 0.72,
      900: 0.87
    },
  },
  [TYPE.CONFIG.LIBRARY]: {
    folders: []
  },
  [TYPE.CONFIG.PARSER]: {
    skipCovers: false,
    pathImage: null,
    fileFormats: ['mp3'],
    glob: null,
    parseStrict: false,
    requiredMetadata: []
  }
};

const CACHE = {
  [TYPE.CONFIG.GENERAL]: {
    page: null
  },
  [TYPE.CONFIG.PLAYER]: {
    volume: 1,
    autoplay: true,
    muted: false
  },
  [TYPE.CONFIG.DIMENSIONS]: {
    width: 640,
    height: 480
  },
  [TYPE.CONFIG.POSITION]: {
    x: 0,
    y: 0
  }
};

module.exports = {
  CACHE,
  CONFIG,
  TYPE,
  ACTION
};
