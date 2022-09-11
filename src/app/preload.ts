import type { IpcApi, IpcEvent } from '../types/ipc';

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
  library: {
    scan: payload => invoke(IpcChannel.Library, IpcAction.Scan, payload)
  },
  window: {
    minimize: () => send(IpcChannel.Window, IpcAction.Minimize),
    maximize: () => send(IpcChannel.Window, IpcAction.Maximize),
    close: () => send(IpcChannel.Window, IpcAction.Close)
  },
  storage: {
    get: (channel, payload) => invoke(channel, IpcAction.Get, payload),
    set: (channel, payload) => invoke(channel, IpcAction.Set, payload)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
