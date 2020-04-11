import { TYPE } from '@doombox/utils';

// Crud
import {
  ipcRead,
  ipcUpdateOne,
} from './crud';

export const fetchCache = () => ipcRead(TYPE.IPC.CACHE);
export const updateCacheGeneral = payload => ipcUpdateOne(
  TYPE.IPC.CACHE,
  [TYPE.CONFIG.GENERAL],
  payload
);
export const updateCachePlayer = payload => ipcUpdateOne(
  TYPE.IPC.CACHE,
  [TYPE.CONFIG.PLAYER],
  payload
);
export const updateConfigDimensions = payload => ipcUpdateOne(
  TYPE.IPC.CACHE,
  [TYPE.CONFIG.DIMENSIONS],
  payload
);
export const updateConfigPosition = payload => ipcUpdateOne(
  TYPE.IPC.CACHE,
  [TYPE.CONFIG.POSITION],
  payload
);
