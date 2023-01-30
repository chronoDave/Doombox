import type { Album, Label, Song } from '../../types/library';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { Immutable } from 'immer';

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

export type State = Immutable<{
  app: {
    ready: boolean
    scanning: boolean
  },
  player: {
    current?: {
      id: string
      duration: number
    }
    playlist: {
      index: number
      songs: string[]
    }
  }
  view: {
    app: ViewApp
    settings: ViewSettings
  },
  library: {
    songs: {
      list: Song[]
      map: Map<string, Song>
    }
    albums: Album[]
    labels: Label[]
  }
  theme: ThemeShape
  user: UserShape
}>;