import type { ThemeShape } from '../../../types/shapes/theme.shape';

import { IpcChannel } from '../../../types/ipc';

export const getTheme = (key: keyof ThemeShape) =>
  window.ipc.storage.get<ThemeShape>(IpcChannel.Theme, { key });
export const setTheme = <T extends keyof ThemeShape>(key: T, value: Partial<ThemeShape[T]>) =>
  window.ipc.storage.set<ThemeShape>(IpcChannel.Theme, { key, value });
