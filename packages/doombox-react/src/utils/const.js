export const STATUS = {
  AUDIO: {
    PLAYING: 'playing',
    PAUSED: 'paused',
    STOPPED: 'stopped'
  }
};

export const EVENT = {
  AUDIO: {
    STATUS: 'status',
    PLAYLIST: 'playlist',
    POSITION: 'position',
    DURATION: 'duration',
    VOLUME: 'volume',
    MUTED: 'muted',
    CURRENT: 'current',
    AUTOPLAY: 'autoplay',
    RPC: 'rpc'
  }
};

export const HOOK = {
  AUDIO: {
    PLAYLIST: 'Playlist',
    VOLUME: 'Volume',
    METHOD: 'Method',
    CURRENT: 'Current',
    POSITION: 'Position',
    COLLECTION: 'Collection',
    LIBRARY: 'Library',
    PLAYER: 'Player',
    IMAGE: 'Image'
  },
  IPC: {
    METHOD: 'Method',
    CONFIG: 'Config',
    INTERRUPT: 'Interrupt',
    MESSAGE: 'Message',
    SYSTEM: 'System',
    IMAGE: 'Image',
    CACHE: 'Cache'
  },
  ROUTE: {
    METHOD: 'Method',
    LOCATION: 'Location'
  }
};

export const PATH = {
  DOMAIN: {
    LIBRARY: 'library',
    VISUALIZER: 'visualizer'
  },
  PAGE: {
    SONG: 'song',
    LABEL: 'label',
    ROOT: 'root'
  },
  DIALOG: {
    SETTINGS: 'settings',
    INTERRUPT: 'interrupt'
  }
};

export const MUI = {
  COLORS: [
    'default',
    'inherit',
    'primary',
    'secondary'
  ]
};
