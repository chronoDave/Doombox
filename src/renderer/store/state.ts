import type { Album, Label, Song } from '../../types/library';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { Immutable } from 'immer';

import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';

export type State = Immutable<{
  app: {
    ready: boolean
    scanning: boolean
  },
  view: {
    app: 'playlist' | 'player' | 'song' | 'album' | 'label' | 'settings'
    settings: 'appearance' | 'library'
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

const state: State = {
  app: {
    ready: false,
    scanning: false
  },
  view: {
    app: 'song',
    settings: 'library'
  },
  library: {
    songs: {
      list: [],
      map: new Map()
    },
    albums: [],
    labels: []
  },
  theme: themeShape,
  user: userShape
};

export default state;
