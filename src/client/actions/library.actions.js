import { IPC, VIEWS } from '@doombox-utils/types';

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
        { from: VIEWS.INTERRUPT, to: VIEWS.ALBUM }
      );
    }
  })
  .catch(console.error);

export const scanFolder = folders => {
  if (Array.isArray(folders) && folders.length > 0) {
    ipcInsert(
      IPC.CHANNEL.LIBRARY,
      folders,
      { from: VIEWS.INTERRUPT, to: VIEWS.ALBUM }
    );
  }
};

export const deleteLibrary = () => {
  ipcDrop(IPC.CHANNEL.LIBRARY, { from: VIEWS.INTERRUPT, to: VIEWS.ALBUM });
};
