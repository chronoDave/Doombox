import type { State } from './state';

import deepEqual from 'fast-deep-equal';

import Store from '@doombox/renderer/store/store';
import themeShape from '@doombox/types/shapes/theme.shape';
import userShape from '@doombox/types/shapes/user.shape';

import { Route } from './state';

const store = new Store<State>({
  route: Route.Appearance,
  user: userShape,
  theme: themeShape
});

store.on((cur, prev) => {
  if (!deepEqual(cur.theme, prev.theme)) window.ipc.theme.set(cur.theme);
  if (!deepEqual(cur.user, prev.user)) window.ipc.user.set(cur.user);
});

export default store;
