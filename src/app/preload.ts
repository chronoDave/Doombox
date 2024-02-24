import type {
  IpcEvent,
  IpcApi,
  IpcChannelReceive,
  IpcPayloadReceive,
  IpcReceiveController
} from '../types/ipc';

import { contextBridge, ipcRenderer } from 'electron';

import { IS_DEV } from '../lib/const';
import { IpcRoute, IpcChannel } from '../types/ipc';

const send = (
  channel: IpcChannel,
  action: IpcRoute
) => (payload?: unknown) => {
  const event: IpcEvent = { action, payload };
  ipcRenderer.send(channel, event);
};

const invoke = (
  channel: IpcChannel,
  action: IpcRoute
) => async (payload?: unknown) => {
  const event: IpcEvent = { action, payload };
  const result = await ipcRenderer.invoke(channel, event);

  if (IS_DEV) {
    console.group('[ipc]', `${channel}.${action}`);
    console.log('[event]', event);
    console.log('[result]', result);
    console.groupEnd();
  }

  return result;
};

const receive = <T extends keyof IpcReceiveController>(channel: T) =>
  (cb: (payload: IpcPayloadReceive[T]) => void) => {
    const channelReceive: IpcChannelReceive<T> = `${IpcChannel.Receive}.${channel}`;
    const handler = (...args: any[]) => cb(args[1]);
    ipcRenderer.on(channelReceive, handler);

    return () => ipcRenderer.off(channelReceive, handler);
  };

const ipc: IpcApi = {
  dir: JSON.parse(process.argv.slice(-1)[0]),
  app: {
    selectFolders: invoke(IpcChannel.App, IpcRoute.SelectFolders)
  },
  library: {
    add: invoke(IpcChannel.Library, IpcRoute.Add),
    remove: invoke(IpcChannel.Library, IpcRoute.Remove),
    rebuild: invoke(IpcChannel.Library, IpcRoute.Rebuild),
    reindex: invoke(IpcChannel.Library, IpcRoute.Reindex),
    get: invoke(IpcChannel.Library, IpcRoute.Get),
    search: invoke(IpcChannel.Library, IpcRoute.Search)
  },
  playlist: {
    add: invoke(IpcChannel.Playlist, IpcRoute.Add),
    get: invoke(IpcChannel.Playlist, IpcRoute.Get),
    remove: invoke(IpcChannel.Playlist, IpcRoute.Remove),
    update: invoke(IpcChannel.Playlist, IpcRoute.Update)
  },
  window: {
    minimize: send(IpcChannel.Window, IpcRoute.Minimize),
    maximize: send(IpcChannel.Window, IpcRoute.Maximize),
    close: send(IpcChannel.Window, IpcRoute.Close)
  },
  user: {
    get: invoke(IpcChannel.User, IpcRoute.Get),
    set: invoke(IpcChannel.User, IpcRoute.Set)
  },
  theme: {
    get: invoke(IpcChannel.Theme, IpcRoute.Get),
    set: invoke(IpcChannel.Theme, IpcRoute.Set)
  },
  cache: {
    get: invoke(IpcChannel.Cache, IpcRoute.Get),
    set: invoke(IpcChannel.Cache, IpcRoute.Set)
  },
  on: {
    song: receive(IpcRoute.Song),
    image: receive(IpcRoute.Image),
    play: receive(IpcRoute.Play),
    pause: receive(IpcRoute.Pause),
    next: receive(IpcRoute.Next),
    previous: receive(IpcRoute.Previous),
    shuffle: receive(IpcRoute.Shuffle)
  },
  player: {
    play: send(IpcChannel.Player, IpcRoute.Play),
    pause: send(IpcChannel.Player, IpcRoute.Pause)
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
