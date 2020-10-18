import { IPC, ROUTES } from '@doombox-utils/types';

import { ipcInsert, ipcDrop } from './ipc.actions';

const { dialog } = require('electron').remote;

export const scanFolderNative = () => dialog.showOpenDialog(null, {
  title: 'Scan folder',
  properties: ['openDirectory', 'multiSelections']
})
  .then(({ cancelled, filePaths }) => {
    if (!cancelled) {
      ipcInsert(
        IPC.CHANNEL.LIBRARY,
        filePaths,
        { from: ROUTES.INTERRUPT, to: ROUTES.MAIN }
      );
    }
  })
  .catch(console.error);

export const scanFolder = folders => {
  if (Array.isArray(folders) && folders.length > 0) {
    ipcInsert(
      IPC.CHANNEL.LIBRARY,
      folders,
      { from: ROUTES.INTERRUPT, to: ROUTES.MAIN }
    );
  }
};

export const deleteLibrary = () => {
  ipcDrop(IPC.CHANNEL.LIBRARY);
};
