import { contextBridge } from 'electron';

import { send, transfer } from '../../lib/ipc/api';

const ipc = {
  window: {
    minimize: send('window', 'minimize'),
    maximize: send('window', 'maximize'),
    close: send('window', 'close')
  },
  os: {
    folders: transfer('os', 'folders')
  },
  user: {
    get: transfer('user', 'get'),
    set: transfer('user', 'set')
  },
  theme: {
    get: transfer('theme', 'get'),
    set: transfer('theme', 'set')
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
