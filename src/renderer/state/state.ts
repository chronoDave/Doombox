import type { LibrarySlice } from './slices/library.slice';
import type { ThemeSlice } from './slices/theme.slice';
import type { AppSlice } from './slices/app.slice';
import type { UserSlice } from './slices/user.slice';

import createCollection from '../utils/createCollection';
import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';

import { setLibraryEmpty, setReady } from './slices/app.slice';
import { fetchUser } from './slices/user.slice';
import { fetchTheme } from './slices/theme.slice';
import { fetchSongs } from './slices/library.slice';

export type State = {
  app: Readonly<AppSlice>
  library: Readonly<LibrarySlice>
  config: {
    user: Readonly<UserSlice>
    theme: Readonly<ThemeSlice>
  }
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
  config: {
    user: {
      shape: userShape
    },
    theme: {
      shape: themeShape
    }
  }
};

export const init = async () => {
  await fetchSongs(state.library);
  await fetchTheme(state.config.theme);
  await fetchUser(state.config.user);

  if (state.config.user.shape.library.folders.length === 0) {
    setLibraryEmpty(state.app, true);
  }

  setReady(state.app, true);
};

export default state;
