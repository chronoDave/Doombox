import type { TransferController } from '../../types/ipc';

import { dialog } from 'electron';

const osController: TransferController['os'] = {
  folders: () => dialog.showOpenDialog({
    title: 'Select folder',
    properties: [
      'multiSelections',
      'createDirectory',
      'openDirectory'
    ]
  })
    .then(x => x.filePaths)
};

export default osController;
