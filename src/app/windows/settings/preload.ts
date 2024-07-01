import { contextBridge } from 'electron';

import { send } from '../../lib/ipc/api';

const ipc = {
  window: {
    minimize: send('window', 'minimize'),
    maximize: send('window', 'maximize'),
    close: send('window', 'close')
  }
};

contextBridge.exposeInMainWorld('ipc', ipc);
