import type { ReceiveController } from '../../types/ipc';
import type Window from '../lib/window/window';

export type RouterControllerProps = {
  settings: Window
};

export default (props: RouterControllerProps): ReceiveController['router'] => ({
  settings: () => props.settings.show()
});
