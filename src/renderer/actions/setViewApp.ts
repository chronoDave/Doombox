import type { ViewApp } from '../state/types';

import produce from 'immer';

import store from '../state/store';

const setViewApp = (view: ViewApp) => {
  const current = store.get();
  if (current.view.app !== view) {
    store.dispatch(produce(draft => {
      draft.view.app = view;
    }));
  }
};

export default setViewApp;
