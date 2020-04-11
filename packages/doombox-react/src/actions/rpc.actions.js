import { TYPE } from '@doombox/utils';

// Crud
import { ipcCreate } from './crud';

export const setRpc = payload => ipcCreate(TYPE.IPC.RPC, payload);
