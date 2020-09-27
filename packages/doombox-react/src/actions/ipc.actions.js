import { ipcRenderer } from 'electron';

import { IPC } from '../../../doombox-types';

export const ipcInsert = (channel, payload) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.INSERT,
    data: { payload }
  });

export const ipcFind = (channel, query = {}) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.FIND,
    data: { query }
  });

export const ipcDrop = channel => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.DROP,
    data: {}
  });
