import type { IpcChannel, IpcInvokeController } from '../../../types/ipc';

import { dialog } from 'electron';

export default (): IpcInvokeController[IpcChannel.App] => ({
  selectFolders: () => dialog.showOpenDialog({
    title: 'Select folder',
    properties: [
      'multiSelections',
      'createDirectory',
      'openDirectory'
    ]
  })
    .then(x => x.filePaths)
});
