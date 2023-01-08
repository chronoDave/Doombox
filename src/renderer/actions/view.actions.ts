import type { State } from '../store/state';

import store from '../store/store';

export const setViewApp = (view: State['view']['app']) =>
  store.dispatch('setViewApp', view);

export const setViewSettings = (view: State['view']['settings']) =>
  store.dispatch('setViewSettings', view);
