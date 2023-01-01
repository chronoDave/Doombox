import type { State } from '../store';

import store from '../store';

export const setViewApp = (view: State['view']['library']) =>
  store.dispatch('setViewLibrary', view);

export const setViewSettings = (view: State['view']['settings']) =>
  store.dispatch('setViewSettings', view);
