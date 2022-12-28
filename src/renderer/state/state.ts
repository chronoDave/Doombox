import type { LibraryState } from './slices/library.slice';
import type { ThemeState } from './slices/theme.slice';
import type { AppState } from './slices/app.slice';
import type { UserState } from './slices/user.slice';
import type { SettingsState } from './slices/settings.slice';

import createCollection from '../utils/createCollection';
import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { IS_DEV } from '../../utils/const';
import EventEmitter from '../../utils/eventEmitter';

import appActions from './slices/app.slice';
import userActions from './slices/user.slice';
import themeActions from './slices/theme.slice';
import libraryActions from './slices/library.slice';
import settingsActions from './slices/settings.slice';

export type State = {
  app: Readonly<AppState>
  settings: Readonly<SettingsState>
  library: Readonly<LibraryState>
  user: Readonly<UserState>
  theme: Readonly<ThemeState>
};

export const emitter = new EventEmitter();

const state: State = {
  app: {
    ready: false,
    view: 'album'
  },
  settings: {
    open: true,
    view: 'appearance'
  },
  library: {
    empty: true,
    song: createCollection([])
  },
  user: {
    shape: userShape
  },
  theme: {
    shape: themeShape
  }
};

export const {
  app,
  settings,
  library,
  user,
  theme
} = state;

export const actions = {
  app: appActions(state.app)(emitter),
  library: libraryActions(state.library)(emitter),
  user: userActions(state.user)(emitter),
  theme: themeActions(state.theme)(emitter),
  settings: settingsActions(state.settings)(emitter)
};

if (IS_DEV) {
  // @ts-ignore
  window.actions = actions;
  // @ts-ignore
  window.state = state;
}
