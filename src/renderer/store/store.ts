import type {
  Album,
  Label,
  Library,
  Song
} from '../../types/library';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';
import type { Immutable } from 'immer';

import { produce } from 'immer';

import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { IS_DEV } from '../../utils/const';
import createStore from '../utils/createStore';

export type State = Immutable<{
  ready: boolean,
  view: {
    app: 'playlist' | 'player' | 'song' | 'album' | 'label' | 'settings',
    settings: 'appearance' | 'library'
  },
  library: {
    songs: Map<string, Song>
    albums: Map<string, Album>
    labels: Map<string, Label>
  }
  theme: ThemeShape
  user: UserShape
}>;

const state: State = {
  ready: false,
  view: {
    app: 'settings',
    settings: 'library'
  },
  library: {
    songs: new Map(),
    albums: new Map(),
    labels: new Map()
  },
  theme: themeShape,
  user: userShape
};

const store = createStore(state, {
  setReady: {
    channel: 'ready',
    action: (ready: boolean) => produce(draft => {
      draft.ready = ready;
    })
  },
  setViewLibrary: {
    channel: 'view',
    action: (view: State['view']['app']) => produce(draft => {
      draft.view.app = view;
    })
  },
  setViewSettings: {
    channel: 'view',
    action: (view: State['view']['settings']) => produce(draft => {
      draft.view.settings = view;
    })
  },
  setLibrary: {
    channel: 'library',
    action: (library: Library) => produce(draft => {
      draft.library.songs = new Map(library.songs.map(song => [song._id, song]));
      draft.library.albums = new Map(library.albums.map(album => [album._id, album]));
      draft.library.labels = new Map(library.labels.map(label => [label._id, label]));
    })
  },
  setTheme: {
    channel: 'theme',
    action: (theme: ThemeShape) => produce(draft => {
      draft.theme = theme;
    })
  },
  setUser: {
    channel: 'user',
    action: (user: UserShape) => produce(draft => {
      draft.user = user;
    })
  },
  setThemeType: {
    channel: 'theme',
    action: (theme: ThemeShape['theme']) => produce(draft => {
      draft.theme.theme = theme;
    })
  }
});

if (IS_DEV) window.store = store;

export type Store = typeof store;
export default store;
