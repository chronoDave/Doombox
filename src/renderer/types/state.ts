import type { Album, Label, Song } from '../../types/library';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { AudioStatus } from '../lib/audio';
import type { AppView, SettingsView } from './view';

export type State = {
  app: {
    ready: boolean
    scanning: boolean
  }
  player: {
    current: {
      id?: string
      position: number
      duration: number
    },
    status: AudioStatus,
    loop: boolean
    muted: boolean
    autoplay: boolean
    volume: number
  },
  playlist: {
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
  }
  search: {
    songs: string[] | null
    albums: string[] | null
    labels: string[] | null
  }
  theme: ThemeShape
  user: UserShape
};
