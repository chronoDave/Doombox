import { ipcRenderer } from 'electron';

import { IPC } from '@doombox/utils';

export const ipcCreate = (channel, payload) => ipcRenderer
  .send(channel, {
    action: IPC.ACTION.CREATE,
    data: { payload }
  });
