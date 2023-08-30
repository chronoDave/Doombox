import type { AppView, SettingsView } from '../../../types/views';

import produce from 'immer';

import updateCache from '../../utils/updateCache';
import store from '../store';

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

export const setViewSettings = (view: SettingsView | null) => {
  const current = store.get();
  if (current.view.settings !== view) {
    store.dispatch(produce(draft => {
      draft.view.settings = view;
    }), 'view.setViewSettings');
  }
};
