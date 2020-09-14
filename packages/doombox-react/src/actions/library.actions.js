import { IPC } from '@doombox/utils';

import { ipcCreate, ipcDrop } from './ipc.actions';

const { dialog } = require('electron').remote;

export const scanFolderNative = () => dialog.showOpenDialog(null, {
  title: 'Scan folder',
  properties: ['openDirectory', 'multiSelections']
})
  .then(({ cancelled, filePaths }) => {
    if (!cancelled) ipcCreate(IPC.CHANNEL.LIBRARY, filePaths);
  })
  .catch(console.error);

export const scanFolder = folders => {
  if (Array.isArray(folders) && folders.length > 0) {
    ipcCreate(IPC.CHANNEL.LIBRARY, folders);
  }
};

export const deleteLibrary = () => {
  ipcDrop(IPC.CHANNEL.LIBRARY);
};