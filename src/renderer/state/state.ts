import type { LibrarySlice } from './slices/library.slice';
import type { ThemeSlice } from './slices/theme.slice';
import type { AppSlice } from './slices/app.slice';
import type { UserSlice } from './slices/user.slice';

import createCollection from '../utils/createCollection';
import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { IS_DEV } from '../../utils/const';

import appActions from './slices/app.slice';
import userActions from './slices/user.slice';
import themeActions from './slices/theme.slice';
import libraryActions from './slices/library.slice';

export type State = {
  app: Readonly<AppSlice>
  library: Readonly<LibrarySlice>
  user: Readonly<UserSlice>
  theme: Readonly<ThemeSlice>
};

const state: State = {
  app: {
    ready: false,
    library: {
      isEmpty: true
    }
  },
  library: {
    song: createCollection([])
  },
  user: {
    shape: userShape
  },
  theme: {
    shape: themeShape
  }
};

const actions = {
  app: appActions(state.app),
  library: libraryActions(state.library),
  user: userActions(state.user),
  theme: themeActions(state.theme)
};

if (IS_DEV) {
  // @ts-ignore
  window.actions = actions;
}

export const init = async () => {
  await Promise.all([
    actions.library.fetchSongs(),
    actions.theme.fetchTheme(),
    actions.user.fetchUser()
  ]);

  if (state.user.shape.library.folders.length === 0) {
    actions.app.setLibraryEmpty(true);
  }

  actions.app.setReady(true);
};

export default state;
