import type { State } from './state';

import deepEqual from 'fast-deep-equal';
import produce from 'immer';

import Store from '@doombox/renderer/store/store';
import themeShape from '@doombox/types/shapes/theme.shape';
import userShape from '@doombox/types/shapes/user.shape';

import { Route } from './state';

const store = new Store<State>({
  route: Route.Library,
  user: userShape,
  theme: themeShape
});

Promise.all([
  window.ipc.user.get(),
  window.ipc.theme.get()
])
  .then(([user, theme]) => store.set(produce(draft => {
    draft.theme = theme;
    draft.user = user;
  })))
  .catch(console.error);

store.on((cur, prev) => {
  if (!deepEqual(cur.theme, prev.theme)) window.ipc.theme.set(cur.theme);
  if (!deepEqual(cur.user, prev.user)) window.ipc.user.set(cur.user);
});

export default store;
