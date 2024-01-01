import type * as Route from './route';
import type { Album, Label, Song } from '../../types/library';
import type { Playlist } from '../../types/playlist';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { AudioStatus } from '../lib/audio';

export type State = {
  app: {
    directory: {
      thumbs: string | null
    }
  }
  route: {
    app: Route.App
    search: Route.Search | null
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
