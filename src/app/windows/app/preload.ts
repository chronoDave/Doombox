import type { Api } from '../../../types/ipc';

import { contextBridge } from 'electron';

import { send, subscribe, transfer } from '../../lib/ipc/api';

const ipc: Api = {
  window: {
    minimize: send('window', 'minimize'),
    maximize: send('window', 'maximize'),
    close: send('window', 'close')
  },
  player: {
    play: send('player', 'play'),
    pause: send('player', 'pause')
  },
  router: {
    settings: send('router', 'settings')
  },
  os: {
    image: transfer('os', 'image'),
    folders: transfer('os', 'folders')
  },
  theme: {
    get: transfer('theme', 'get'),
    set: transfer('theme', 'set')
  },
  user: {
    get: transfer('user', 'get'),
    set: transfer('user', 'set')
  },
  cache: {
    get: transfer('cache', 'get'),
    set: transfer('cache', 'set')
  },
  library: {
    add: transfer('library', 'add'),
    select: transfer('library', 'select'),
    remove: transfer('library', 'remove'),
    reindex: transfer('library', 'reindex'),
    rebuild: transfer('library', 'rebuild')
  },
  playlist: {
    add: transfer('playlist', 'add'),
    update: transfer('playlist', 'update'),
    remove: transfer('playlist', 'remove'),
    get: transfer('playlist', 'get')
  },
  search: {
    album: transfer('search', 'album')
  },
  on: {
    parser: {
      song: subscribe('parser', 'song'),
      image: subscribe('parser', 'image'),
      size: subscribe('parser', 'size')
    },
    player: {
      play: subscribe('player', 'play'),
      pause: subscribe('player', 'pause'),
      next: subscribe('player', 'next'),
      previous: subscribe('player', 'previous'),
      shuffle: subscribe('player', 'shuffle')
    }
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
