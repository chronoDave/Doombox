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
    VOLUME: 'Volume',
    METHOD: 'Method',
    CURRENT: 'Current',
    POSITION: 'Position',
    PLAYER: 'Player',
    IMAGE: 'Image'
  },
  ROUTE: {
    METHOD: 'Method',
    LOCATION: 'Location'
  },
  PLAYLIST: {
    METHOD: 'Method',
    CURRENT: 'Current'
  }
};

export const PATH = {
  DOMAIN: {
    LIBRARY: 'library',
    VISUALIZER: 'visualizer',
    PLAYLIST: 'playlist'
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

export const MEDIA_SESSION = {
  SIZES: [
    '96x96',
    '128x128',
    '192x192',
    '256x256',
    '384x384',
    '512x512'
  ]
};
