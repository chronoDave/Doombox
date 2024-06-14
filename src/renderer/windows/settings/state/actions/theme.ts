import type { ThemeShape } from '@doombox/types/shapes/theme.shape';

import produce from 'immer';

import store from '../store';

export const set = (theme: ThemeShape['theme']) => {
  const state = store.set(produce(draft => {
    draft.theme.theme = theme;
  }), 'theme.set');

  window.ipc.theme.set(state.theme);
};
