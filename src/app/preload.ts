import type { Shape } from '../types/primitives';
import type {
  IpcApi,
  IpcEvent,
  IpcPayloadGet,
  IpcPayloadSet
} from '../types/ipc';

import { contextBridge, ipcRenderer } from 'electron';

import { IpcAction, IpcChannel } from '../types/ipc';

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
    minimize: () => send(IpcChannel.Window, IpcAction.Minimize),
    maximize: () => send(IpcChannel.Window, IpcAction.Maximize),
    close: () => send(IpcChannel.Window, IpcAction.Close)
  },
  storage: {
    get: async <T extends Shape>(
      channel: IpcChannel,
      payload: IpcPayloadGet<T>
    ) => invoke(channel, IpcAction.Get, payload),
    set: async <T extends Shape>(
      channel: IpcChannel,
      payload: IpcPayloadSet<T>
    ) => invoke(channel, IpcAction.Set, payload)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
