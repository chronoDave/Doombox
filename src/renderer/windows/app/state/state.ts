import type * as Route from './route';
import type { AudioStatus } from '../../../lib/audio/audio';
import type { Album, Label, Song } from '@doombox/types/library';
import type { Playlist } from '@doombox/types/playlist';
import type { ThemeShape } from '@doombox/types/shapes/theme.shape';
import type { UserShape } from '@doombox/types/shapes/user.shape';

export type State = {
  ipc: {
    parser: {
      size: number | null
      file: string | null
    }
  }
  route: {
    app: Route.App
    home: Route.Home
    search: Route.Search
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
