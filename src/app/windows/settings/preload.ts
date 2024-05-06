import type { IpcEvent } from '@doombox/types/ipc';

import { contextBridge, ipcRenderer } from 'electron';

import { IpcChannel, IpcRoute } from '@doombox/types/ipc';

const send = (
  channel: IpcChannel,
  action: IpcRoute
) => (payload?: unknown) => {
  const event: IpcEvent = { action, payload };
  ipcRenderer.send(channel, event);
};

const ipc = {
  window: {
    minimize: send(IpcChannel.Window, IpcRoute.Minimize),
    maximize: send(IpcChannel.Window, IpcRoute.Maximize),
    close: send(IpcChannel.Window, IpcRoute.Close)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
