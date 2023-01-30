import type { ThemeShape } from '../../../types/shapes/theme.shape';

import store from '../store';

export const fetchTheme = async () => {
  const theme = await window.ipc.theme.all();
  store.dispatch('setTheme', theme);
};

export const setTheme = async (theme: ThemeShape['theme']) => {
  await window.ipc.theme.set({ key: 'theme', value: theme });
  store.dispatch('setThemeType', theme);
};
