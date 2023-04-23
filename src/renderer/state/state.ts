import type { Album, Label, Song } from '../../types/library';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { PlayerStatus } from '../lib/player';

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

export type State = {
  app: {
    ready: boolean
    scanning: boolean
  }
  player: {
    muted: boolean
    volume: number
    status: PlayerStatus,
    current: {
      id: string
      duration: number
      position: number
    }
  },
  playlist: {
    index: number
    songs: string[]
  },
  view: {
    app: ViewApp
    settings: ViewSettings
  }
  entities: {
    song: Map<string, Song>
    album: Map<string, Album>
    label: Map<string, Label>
  }
  search: {
    songs: string[] | null
    albums: string[] | null
    labels: string[] | null
  }
  theme: ThemeShape
  user: UserShape
};
