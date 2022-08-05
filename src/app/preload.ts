import { contextBridge, ipcRenderer } from 'electron';

import type { Shape } from '../types/primitives';
import type {
  IpcApi,
  IpcChannel,
  IpcEventGet,
  IpcEventSet,
  IpcPayloadGet,
  IpcPayloadSet
} from '../types/ipc';

import { IpcAction } from '../types/ipc';

const ipc: IpcApi = {
  get: async <T extends Shape>(channel: IpcChannel, payload: IpcPayloadGet<T>) => {
    const event: IpcEventGet<T> = { action: IpcAction.Get, payload };
    return ipcRenderer.invoke(channel, event);
  },
  set: async <T extends Shape>(channel: IpcChannel, payload: IpcPayloadSet<T>) => {
    const event: IpcEventSet<T> = { action: IpcAction.Set, payload };
    return ipcRenderer.invoke(channel, event);
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
