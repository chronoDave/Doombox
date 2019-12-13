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
    PLAYER: 'Player',
    IMAGE: 'Image'
  },
  IPC: {
    METHOD: 'Method',
    CONFIG: 'Config'
  }
};

export const PATH = {
  SONG: 'song',
  ALBUM: 'album',
  VISUALIZER: 'visualizer'
};
