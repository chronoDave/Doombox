import type { ThemeShape } from '../../../types/shapes/theme.shape';

export const getTheme = (key: keyof ThemeShape) =>
  window.ipc.storage.get<ThemeShape>('THEME', { key });
export const setTheme = <T extends keyof ThemeShape>(key: T, value: Partial<ThemeShape[T]>) =>
  window.ipc.storage.set<ThemeShape>('THEME', { key, value });
