import type { Album, Label, Song } from '../../types/library';
import type { Playlist } from '../../types/playlist';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { AppView, SettingsView } from '../../types/views';
import type { AudioStatus } from '../lib/audio';

export enum Route {
  Load = 'load',
  Scan = 'scan',
  Library = 'library',
  Settings = 'settings'
}

export type State = {
  app: {
    directory: {
      thumbs: string | null
    }
  }
  route: Route
  player: {
    current: {
      id: string | null
      position: number
      duration: number
    },
    status: AudioStatus,
    loop: boolean
    muted: boolean
    autoplay: boolean
    volume: number
  },
  queue: {
    index: number
    songs: string[]
  },
  view: {
    app: AppView
    settings: SettingsView
  }
  entities: {
    song: Map<string, Song>
    album: Map<string, Album>
    label: Map<string, Label>
    playlist: Map<string, Playlist>
  }
  search: {
    songs: string[] | null
    albums: string[] | null
    labels: string[] | null
  }
  theme: ThemeShape
  user: UserShape
};
