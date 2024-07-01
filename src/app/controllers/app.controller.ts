import type { IpcChannel, IpcInvokeController } from '../../types/ipc';

import { dialog } from 'electron';

const appController: IpcInvokeController[IpcChannel.App] = {
  selectFolders: () => dialog.showOpenDialog({
    title: 'Select folder',
    properties: [
      'multiSelections',
      'createDirectory',
      'openDirectory'
    ]
  })
    .then(x => x.filePaths)
};

export default appController;
