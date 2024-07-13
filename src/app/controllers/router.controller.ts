import type { ReceiveController } from '../../types/ipc';

import createWindowSettings from '../windows/settings/settings';

export type RouterControllerProps = {
  root: string
};

export default (props: RouterControllerProps): ReceiveController['router'] => ({
  settings: () => createWindowSettings(props.root).show()
});
