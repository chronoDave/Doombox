import type { Immutable } from 'immer';
import type {
  Album,
  Label,
  Library,
  Song
} from '../../types/library';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { UserShape } from '../../types/shapes/user.shape';

import { produce } from 'immer';

import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import createStore from '../utils/createStore';
import { IS_DEV } from '../../utils/const';

export type State = Immutable<{
  ready: boolean,
  layout: 'library' | 'settings'
  view: {
    library: 'song' | 'album' | 'label',
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
  layout: 'library',
  view: {
    library: 'song',
    settings: 'appearance'
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
    action: (view: State['view']['library']) => produce(draft => {
      draft.view.library = view;
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
  setLayout: {
    channel: 'layout',
    action: (layout: State['layout']) => produce(draft => {
      draft.layout = layout;
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
