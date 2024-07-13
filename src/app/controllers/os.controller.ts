import type { TransferController } from '../../types/ipc';

import { dialog } from 'electron';

export type OsControllerProps = {
  root: {
    thumbs: string
  }
};

const osController = (props: OsControllerProps): TransferController['os'] => ({
  image: async () => props.root.thumbs,
  folders: () => dialog.showOpenDialog({
    title: 'Select folder',
    properties: [
      'multiSelections',
      'createDirectory',
      'openDirectory'
    ]
  })
    .then(x => x.filePaths)
});

export default osController;
