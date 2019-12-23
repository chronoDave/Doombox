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
    CONFIG: 'Config'
  },
  ROUTE: {
    METHOD: 'Method',
    LOCATION: 'Location'
  }
};

export const PATH = {
  DOMAIN: {
    ROOT: 'root'
  },
  PAGE: {
    SONG: 'song',
    ALBUM: 'album',
    VISUALIZER: 'visualizer'
  },
  DIALOG: {
    SETTINGS: 'settings'
  }
};
