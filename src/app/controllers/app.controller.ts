import type { IpcChannel, IpcInvokeController } from '../../types/ipc';

import dialogSelectFolder from '../utils/dialogSelectFolder';

export default () => (): IpcInvokeController[IpcChannel.App] => ({
  selectFolders: dialogSelectFolder
});
