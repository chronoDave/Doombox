import type { Shape } from '../types/primitives';
import type {
  IpcApi,
  IpcEvent,
  IpcPayloadGet,
  IpcPayloadSet,
  IpcChannel, IpcAction
} from '../types/ipc';

import { contextBridge, ipcRenderer } from 'electron';

const send = (
  channel: IpcChannel,
  action: IpcAction,
  payload: Record<string, unknown> = {}
) => {
  const event: IpcEvent = { action, payload };
  ipcRenderer.send(channel, event);
};

const invoke = (
  channel: IpcChannel,
  action: IpcAction,
  payload: Record<string, unknown> = {}
) => {
  const event: IpcEvent = { action, payload };
  return ipcRenderer.invoke(channel, event);
};

const ipc: IpcApi = {
  window: {
    minimize: () => send('WINDOW', 'MINIMIZE'),
    maximize: () => send('WINDOW', 'MAXIMIZE'),
    close: () => send('WINDOW', 'CLOSE')
  },
  storage: {
    get: async <T extends Shape>(channel: IpcChannel, payload: IpcPayloadGet<T>) => invoke(channel, 'GET', payload),
    set: async <T extends Shape>(channel: IpcChannel, payload: IpcPayloadSet<T>) => invoke(channel, 'SET', payload)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
