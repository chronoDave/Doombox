import type { AppView, SettingsView } from '../../../types/views';

import produce from 'immer';

import { Route } from '../../types/state';
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

export const setViewSettings = (view: SettingsView) => {
  const current = store.get();
  if (current.view.settings !== view) {
    store.dispatch(produce(draft => {
      draft.view.settings = view;
      draft.route = Route.Settings;
    }), 'view.setViewSettings');
  }
};

export const closeSettings = () => store.dispatch(produce(draft => {
  draft.route = Route.Main;
}), 'view.closeSettings');
