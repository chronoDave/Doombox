import type { ThemeShape } from '../../types/shapes/theme.shape';

export const getTheme = (key: keyof ThemeShape) =>
  window.ipc.theme.get({ key });
export const setTheme = <T extends keyof ThemeShape>(key: T, value: Partial<ThemeShape[T]>) =>
  window.ipc.theme.set({ key, value });
