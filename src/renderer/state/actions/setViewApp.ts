import type { ViewApp } from '../types';

import produce from 'immer';

import store from '../store';

const setViewApp = (view: ViewApp) => {
  const current = store.get();
  if (current.view.app !== view) {
    store.dispatch(produce(draft => {
      draft.view.app = view;
    }));
  }
};

export default setViewApp;
