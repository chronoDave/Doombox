import type { ThemeShape } from '@doombox/types/shapes/theme.shape';

import produce from 'immer';

import store from '../store';

export const setTheme = async (reducer: (state: ThemeShape) => ThemeShape) => {
  store.set(produce(draft => {
    draft.theme = reducer(draft.theme);
  }));

  await window.ipc.theme.set(store.state.theme);
};
