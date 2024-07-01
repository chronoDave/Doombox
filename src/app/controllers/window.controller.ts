import type { ReceiveController } from '@doombox/types/ipc';

const windowController: ReceiveController['window'] = {
  close: (_, window) => window?.close(),
  minimize: (_, window) => window?.minimize(),
  maximize: (_, window) => window?.isMaximized() ?
    window.unmaximize() :
    window?.maximize()
};

export default windowController;
