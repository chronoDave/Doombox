import { ipcRenderer } from 'electron';

import { IPC } from '@doombox-utils/types';

export const ipcInsert = (
  channel,
  payload,
  { from = null, to = null } = {}
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.INSERT,
    route: { from, to },
    data: { payload }
  });

export const ipcUpdate = (
  channel,
  query,
  update,
  { from = null, to = null } = {}
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.UPDATE,
    route: { from, to },
    data: { query, update }
  });

export const ipcFind = (
  channel,
  query = {},
  { projection = null, from = null, to = null } = {}
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.FIND,
    route: { from, to },
    data: { query, projection }
  });

export const ipcDrop = (
  channel,
  { from = null, to = null } = {}
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.DROP,
    route: { from, to },
    data: {}
  });
