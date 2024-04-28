import type { ThemeShape } from '../../../../types/shapes/theme.shape';

import produce from 'immer';

import store from '../store';

export const set = (theme: ThemeShape['theme']) => {
  store.dispatch(produce(draft => {
    draft.theme.theme = theme;
  }), 'theme.set');

  window.ipc.theme.set(store.get().theme);
};
