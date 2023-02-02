import type { ViewSettings } from '../types';

import produce from 'immer';

import store from '../store';

const setViewSettings = (view: ViewSettings) => {
  const current = store.get();
  if (current.view.settings !== view) {
    store.dispatch(produce(draft => {
      draft.view.settings = view;
    }));
  }
};

export default setViewSettings;
