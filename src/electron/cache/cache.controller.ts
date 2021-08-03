import Ipc, { IpcController } from '@doombox/ipc';

import Cache from './cache.storage';

const controller: IpcController<'CACHE'> = {
  GET: () => Promise.resolve(Cache.player),
  MUTE: (payload: unknown) => {
    if (!Ipc.isValid<'CACHE', boolean>(payload)) {
      return Promise.reject(new Error(`Invalid payload: ${payload}`));
    }

    Cache.muted = payload.data;
    return Promise.resolve();
  },
  VOLUME: (payload: unknown) => {
    if (!Ipc.isValid<'CACHE', number>(payload)) {
      return Promise.reject(new Error(`Invalid payload: ${payload}`));
    }

    Cache.volume = payload.data;
    return Promise.resolve();
  }
};

export default controller;
