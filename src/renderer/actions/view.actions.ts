import type { State } from '../lib/store/state';

import store from '../lib/store/store';

export const setViewApp = (view: State['view']['app']) => {
  const current = store.get();
  if (current.view.app !== view) store.dispatch('setViewApp', view);
};

export const setViewSettings = (view: State['view']['settings']) => {
  const current = store.get();
  if (current.view.settings !== view) store.dispatch('setViewSettings', view);
};
