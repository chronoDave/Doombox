import type { ThemeShape } from '../../types/shapes/theme.shape';

export const getTheme = () =>
  window.ipc.theme.all();

export const setTheme = <T extends keyof ThemeShape>(key: T, value: Partial<ThemeShape[T]>) =>
  window.ipc.theme.set({ key, value });
