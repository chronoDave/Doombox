export type State = Record<string, unknown>;

export type Action<S extends State> = (payload: any) => (state: S) => S;

export type Reducer<S extends State> = {
  channel: Extract<keyof S, string>
  action: Action<S>
};

/* Enums */
export enum PlayerStatus {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped'
}

export enum ViewApp {
  Playlist = 'playlist',
  Player = 'player',
  Song = 'song',
  Album = 'album',
  Label = 'label',
  Settings = 'settings'
}

export enum ViewSettings {
  Appearance = 'appearance',
  Library = 'library'
}
