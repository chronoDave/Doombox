import type { ThemeShape } from '../../../types/shapes/theme.shape';

import produce from 'immer';

import store from '../store';

export const fetchTheme = async () => {
  const theme = await window.ipc.theme.get();
  store.dispatch(produce(draft => {
    draft.theme = theme;
  }), 'theme.fetchTheme');
};

export const setTheme = async (reducer: (state: ThemeShape) => ThemeShape) => {
  const theme = await window.ipc.theme.set(reducer(store.get().theme));
  store.dispatch(produce(draft => {
    draft.theme = theme;
  }), 'theme.setTheme');
};
