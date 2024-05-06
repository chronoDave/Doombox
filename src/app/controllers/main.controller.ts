import type { IpcChannel, IpcSendController } from '../../types/ipc';
import type { BrowserWindow } from 'electron';

export type MainControllerProps = {
  settings: BrowserWindow
};

export default (props: MainControllerProps) => (): IpcSendController[IpcChannel.Main] => ({
  settings: () => props.settings.isVisible() ?
    props.settings.focus() :
    props.settings.show()
});
