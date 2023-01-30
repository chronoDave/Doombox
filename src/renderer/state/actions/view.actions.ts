import type { ViewApp, ViewSettings } from '../types';

import store from '../store';

export const setViewApp = (view: ViewApp) => {
  const current = store.get();
  if (current.view.app !== view) store.dispatch('setViewApp', view);
};

export const setViewSettings = (view: ViewSettings) => {
  const current = store.get();
  if (current.view.settings !== view) store.dispatch('setViewSettings', view);
};
