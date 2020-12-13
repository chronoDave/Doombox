import { IPC, TYPES } from '@doombox-utils/types';

import { ipcUpdate } from './ipc.actions';

export const updateCache = (key, value) => {
  ipcUpdate(IPC.CHANNEL.CACHE, key, value);
};

export const updateConfig = (key, value) => {
  ipcUpdate(IPC.CHANNEL.CONFIG, key, value);
};

export const updateLanguage = language => {
  ipcUpdate(IPC.CHANNEL.CONFIG, TYPES.CONFIG.LANGUAGE, language);
};
