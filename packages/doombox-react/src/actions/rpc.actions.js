import { TYPE } from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcUpdate
} from './crud';

export const setToken = token => ipcCreate(TYPE.IPC.RPC, token);
export const setRpc = payload => ipcUpdate(TYPE.IPC.RPC, {}, payload);
