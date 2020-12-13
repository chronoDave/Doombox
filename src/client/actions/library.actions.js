import { remote } from 'electron';

import { IPC, WINDOWS } from '@doombox-utils/types';

import { ipcInsert, ipcDrop } from './ipc.actions';

export const scanFolderNative = () => remote.dialog.showOpenDialog(null, {
  title: 'Scan folder',
  properties: ['openDirectory', 'multiSelections']
})
  .then(({ cancelled, filePaths }) => {
    if (!cancelled) {
      ipcInsert(IPC.CHANNEL.LIBRARY, filePaths, [WINDOWS.OVERLAY.SCAN, null]);
    }
  })
  .catch(console.error);

export const scanFolder = folders => {
  if (Array.isArray(folders) && folders.length > 0) {
    ipcInsert(IPC.CHANNEL.LIBRARY, folders, [WINDOWS.OVERLAY.SCAN, null]);
  }
};

export const deleteLibrary = () => {
  ipcDrop(IPC.CHANNEL.LIBRARY);
};
