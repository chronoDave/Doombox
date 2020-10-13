import { ipcRenderer } from 'electron';

import { IPC } from '../../../doombox-types';

export const ipcInsert = (channel, payload, { from = null, to = null } = {}) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.INSERT,
    route: { from, to },
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
