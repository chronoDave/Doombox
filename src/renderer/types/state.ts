import type * as Route from './route';
import type { Album, Label, Song } from '../../types/library';
import type { Playlist } from '../../types/playlist';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { AudioStatus } from '../lib/audio/audio';

export type State = {
  route: {
    app: Route.App
    home: Route.Home
    search: Route.Search
    settings: Route.Settings
  }
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
    title: string
    index: number
    songs: string[]
  }
  entities: {
    song: Map<string, Song>
    album: Map<string, Album>
    label: Map<string, Label>
    playlist: Map<string, Playlist>
  }
  search: {
    songs: Song[]
    albums: Album[]
    labels: Label[]
  }
  theme: ThemeShape
  user: UserShape
};
