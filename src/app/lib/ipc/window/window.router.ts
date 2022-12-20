import type { IpcChannel, IpcEvent, IpcSendController } from '../../../../types/ipc';

import { IpcAction } from '../../../../types/ipc';
import { createIpcRouter } from '../utils';

export default (controller: IpcSendController[IpcChannel.Window]) =>
  createIpcRouter(({ action }: IpcEvent): void => {
    switch (action) {
      case IpcAction.Minimize:
        return controller.minimize();
      case IpcAction.Maximize:
        return controller.maximize();
      case IpcAction.Close:
        return controller.close();
      default:
        throw new Error('Invalid ipc action');
    }
  });
