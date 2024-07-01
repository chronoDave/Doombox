import type { IpcChannel, IpcSendController } from '@doombox/types/ipc';

const windowController: IpcSendController[IpcChannel.Window] = {
  close: ({ window }) => window?.close(),
  minimize: ({ window }) => window?.minimize(),
  maximize: ({ window }) => window?.isMaximized() ?
    window.unmaximize() :
    window?.maximize()
};

export default windowController;
