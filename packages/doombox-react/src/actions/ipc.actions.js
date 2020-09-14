import { ipcRenderer } from 'electron';

import { IPC } from '@doombox/utils';

export const ipcCreate = (channel, payload) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.INSERT,
    data: { payload }
  });

export const ipcDrop = channel => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.DROP,
    data: {}
  });
