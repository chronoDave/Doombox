import type { ViewSettings } from '../state/types';

import produce from 'immer';

import store from '../state/store';

const setViewSettings = (view: ViewSettings) => {
  const current = store.get();
  if (current.view.settings !== view) {
    store.dispatch(produce(draft => {
      draft.view.settings = view;
    }));
  }
};

export default setViewSettings;
