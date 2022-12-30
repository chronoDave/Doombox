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
  payload?: unknown
) => {
  const event: IpcEvent = { action, payload };
  return ipcRenderer.invoke(channel, event);
};

const ipc: IpcApi = {
  app: {
    selectFolders: () => invoke(IpcChannel.App, IpcAction.SelectFolders)
  },
  library: {
    add: payload => invoke(IpcChannel.Library, IpcAction.Add, payload),
    remove: payload => invoke(IpcChannel.Library, IpcAction.Remove, payload),
    rebuild: payload => invoke(IpcChannel.Library, IpcAction.Rebuild, payload),
    get: () => invoke(IpcChannel.Library, IpcAction.Get)
  },
  window: {
    minimize: () => send(IpcChannel.Window, IpcAction.Minimize),
    maximize: () => send(IpcChannel.Window, IpcAction.Maximize),
    close: () => send(IpcChannel.Window, IpcAction.Close)
  },
  user: {
    all: () => invoke(IpcChannel.User, IpcAction.All),
    get: payload => invoke(IpcChannel.User, IpcAction.Get, payload),
    set: payload => invoke(IpcChannel.User, IpcAction.Set, payload)
  },
  theme: {
    all: () => invoke(IpcChannel.Theme, IpcAction.All),
    get: payload => invoke(IpcChannel.Theme, IpcAction.Get, payload),
    set: payload => invoke(IpcChannel.Theme, IpcAction.Set, payload)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
