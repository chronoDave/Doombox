import type { IpcChannel, IpcSendController } from '../../../types/ipc';
import type { BrowserWindow } from 'electron';

export default (window: BrowserWindow): IpcSendController[IpcChannel.Window] => ({
  minimize: () => window.minimize(),
  maximize: () => window.isMaximized() ?
    window.unmaximize() :
    window.maximize(),
  close: () => window.close()
});
