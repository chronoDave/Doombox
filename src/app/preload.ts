import type {
  IpcEvent,
  IpcApi,
  IpcChannelReceive,
  IpcPayloadReceive,
  IpcReceiveController
} from '../types/ipc';

import { contextBridge, ipcRenderer } from 'electron';

import { IpcAction, IpcChannel } from '../types/ipc';

const send = (
  channel: IpcChannel,
  action: IpcAction
) => (payload?: unknown) => {
  const event: IpcEvent = { action, payload };
  ipcRenderer.send(channel, event);
};

const invoke = (
  channel: IpcChannel,
  action: IpcAction
) => (payload?: unknown) => {
  const event: IpcEvent = { action, payload };
  return ipcRenderer.invoke(channel, event);
};

const receive = <T extends keyof IpcReceiveController>(channel: T) =>
  (cb: (payload: IpcPayloadReceive[T]) => void) => {
    const channelReceive: IpcChannelReceive<T> = `${IpcChannel.Receive}.${channel}`;
    const handler = (...args: any[]) => cb(args[1]);
    ipcRenderer.on(channelReceive, handler);

    return () => ipcRenderer.off(channelReceive, handler);
  };

const ipc: IpcApi = {
  app: {
    selectFolders: invoke(IpcChannel.App, IpcAction.SelectFolders)
  },
  library: {
    add: invoke(IpcChannel.Library, IpcAction.Add),
    remove: invoke(IpcChannel.Library, IpcAction.Remove),
    rebuild: invoke(IpcChannel.Library, IpcAction.Rebuild),
    get: invoke(IpcChannel.Library, IpcAction.Get)
  },
  window: {
    minimize: send(IpcChannel.Window, IpcAction.Minimize),
    maximize: send(IpcChannel.Window, IpcAction.Maximize),
    close: send(IpcChannel.Window, IpcAction.Close)
  },
  user: {
    all: invoke(IpcChannel.User, IpcAction.All),
    get: invoke(IpcChannel.User, IpcAction.Get),
    set: invoke(IpcChannel.User, IpcAction.Set)
  },
  theme: {
    all: invoke(IpcChannel.Theme, IpcAction.All),
    get: invoke(IpcChannel.Theme, IpcAction.Get),
    set: invoke(IpcChannel.Theme, IpcAction.Set)
  },
  on: {
    scan: receive(IpcChannel.Scan)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
