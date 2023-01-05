import type { IpcChannel, IpcSendController } from '../../../types/ipc';
import type { BrowserWindow } from 'electron';

export type WindowControllerProps = {
  window: BrowserWindow
};

export default (props: WindowControllerProps): IpcSendController[IpcChannel.Window] => ({
  minimize: () => props.window.minimize(),
  maximize: () => props.window.isMaximized() ?
    props.window.unmaximize() :
    props.window.maximize(),
  close: () => props.window.close()
});
