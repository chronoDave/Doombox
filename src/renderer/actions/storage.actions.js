import { IPC } from '../../types';

import { ipcUpdate } from './ipc.actions';

export const updateCache = (key, value) => {
  ipcUpdate(IPC.CHANNEL.CACHE, key, value);
};

export const updateConfig = (key, value) => {
  ipcUpdate(IPC.CHANNEL.CONFIG, key, value);
};

export const updateTheme = (key, value) => {
  ipcUpdate(IPC.CHANNEL.THEME, key, value);
};
