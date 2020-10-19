import { IPC } from '@doombox-utils/types';

import { ipcUpdate } from './ipc.actions';

export const updateCache = (key, value) => {
  ipcUpdate(IPC.CHANNEL.CACHE, key, value);
};
