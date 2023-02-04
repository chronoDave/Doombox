import type { ThemeShape } from '../../../types/shapes/theme.shape';

import produce from 'immer';

import store from '../store';

export const fetchTheme = async () => {
  const theme = await window.ipc.theme.all();
  store.dispatch(produce(draft => {
    draft.theme = theme;
  }));
};

export const setType = async (type: ThemeShape['theme']) => {
  const theme = await window.ipc.theme.set({ key: 'theme', value: type });
  store.dispatch(produce(draft => {
    draft.theme = theme;
  }));
};
