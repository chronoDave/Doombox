import type { ViewApp, ViewSettings } from '../state';

import produce from 'immer';

import store from '../store';

export const setViewApp = (view: ViewApp) => {
  const current = store.get();
  if (current.view.app !== view) {
    store.dispatch(produce(draft => {
      draft.view.app = view;
    }));
  }
};

export const setViewSettings = (view: ViewSettings) => {
  const current = store.get();
  if (current.view.settings !== view) {
    store.dispatch(produce(draft => {
      draft.view.settings = view;
    }));
  }
};
