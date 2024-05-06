import type { IpcChannel, IpcSendController } from '../../types/ipc';
import type Window from '../lib/window/window';

export type RouterControllerProps = {
  settings: Window
};

export default (props: RouterControllerProps) => (): IpcSendController[IpcChannel.Router] => ({
  settings: () => props.settings.show()
});
