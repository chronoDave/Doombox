import type { IpcEvent, IpcApi } from '../types/ipc';

import { contextBridge, ipcRenderer } from 'electron';

import { IpcAction, IpcChannel } from '../types/ipc';

const send = (
  channel: IpcChannel,
  action: IpcAction,
  payload?: unknown
) => {
  const event: IpcEvent = { action, payload };
  ipcRenderer.send(channel, event);
};

const invoke = (
  channel: IpcChannel,
  action: IpcAction,
  payload: unknown
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
  theme: {
    get: payload => invoke(IpcChannel.Theme, IpcAction.Get, payload),
    set: payload => invoke(IpcChannel.Theme, IpcAction.Set, payload)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
