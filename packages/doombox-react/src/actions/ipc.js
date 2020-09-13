import { IPC } from '@doombox/utils';

import { ipcCreate } from './crud';

const { dialog } = require('electron').remote;

export const scanFolder = () => dialog.showOpenDialog(null, {
  title: 'Scan folder',
  properties: ['openDirectory', 'multiSelections']
})
  .then(({ cancelled, filePaths }) => {
    if (!cancelled) ipcCreate(IPC.CHANNEL.LIBRARY, filePaths);
  })
  .catch(console.error);
