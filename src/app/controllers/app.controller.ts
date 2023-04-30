import type { IpcChannel, IpcInvokeController } from '../../types/ipc';

import { dialog } from 'electron';

export type AppControllerProps = {
  root: string
};

export default (props: AppControllerProps) => (): IpcInvokeController[IpcChannel.App] => ({
  selectFolders: () => dialog.showOpenDialog({
    title: 'Select folder',
    properties: [
      'multiSelections',
      'createDirectory',
      'openDirectory'
    ]
  })
    .then(x => x.filePaths),
  getImagePath: async () => props.root
});
