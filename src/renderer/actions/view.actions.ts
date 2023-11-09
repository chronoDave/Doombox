import type { AppView, SettingsView } from '../../types/views';

import produce from 'immer';

import store from '../store';
import updateCache from '../utils/updateCache';

export const setViewApp = (view: AppView) => {
  const current = store.get();
  if (current.view.app !== view) {
    store.dispatch(produce(draft => {
      draft.view.app = view;
    }), 'view.setViewApp');

    updateCache(produce(draft => {
      draft.tab = view;
    }));
  }
};

export const setViewSettings = (view: SettingsView) => {
  const current = store.get();
  if (current.view.settings !== view) {
    store.dispatch(produce(draft => {
      draft.view.settings = view;
    }), 'view.setViewSettings');
  }
};
