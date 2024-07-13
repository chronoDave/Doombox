import type { ThemeShape } from '@doombox/types/shapes/theme.shape';

import produce from 'immer';

import store from '../store';

export const set = (theme: ThemeShape['theme']) => {
  store.set(produce(draft => {
    draft.theme.theme = theme;
  }));

  window.ipc.theme.set(store.state.theme);
};
