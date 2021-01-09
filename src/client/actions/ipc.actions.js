import { ipcRenderer } from 'electron';

import { IPC } from '@doombox-utils/types';

export const ipcInsert = (
  channel,
  payload,
  overlay = null
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.INSERT,
    overlay,
    data: { payload }
  });

export const ipcUpdate = (
  channel,
  query,
  update,
  overlay = null
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.UPDATE,
    overlay,
    data: { query, update }
  });

export const ipcFind = (
  channel,
  query,
  {
    projection = null,
    overlay = null
  } = {}
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.FIND,
    overlay,
    data: { query, projection }
  });

export const ipcDrop = (
  channel,
  overlay = null
) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.DROP,
    overlay,
    data: {}
  });
