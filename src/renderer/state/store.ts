import type { State } from './types';

import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import Store from '../lib/state/store';

import appSlice from './slices/app.slice';
import librarySlice from './slices/library.slice';
import themeSlice from './slices/theme.slice';
import userSlice from './slices/user.slice';
import viewSlice from './slices/view.slice';
import { ViewApp, ViewSettings } from './types';

const state: State = {
  app: {
    ready: false,
    scanning: false
  },
  player: {
    playlist: {
      index: 0,
      songs: []
    }
  },
  view: {
    app: ViewApp.Song,
    settings: ViewSettings.Library
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

const store = new Store(state, {
  ...appSlice,
  ...viewSlice,
  ...librarySlice,
  ...themeSlice,
  ...userSlice
});

export default store;
