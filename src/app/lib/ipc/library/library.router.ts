import type { IpcInvokeController, IpcChannel, IpcEvent } from '../../../../types/ipc';

import { IpcAction } from '../../../../types/ipc';
import { createIpcRouter } from '../utils';

export default (controller: IpcInvokeController[IpcChannel.Library]) =>
  createIpcRouter(({ action, payload }: IpcEvent): Promise<unknown> => {
    switch (action) {
      case IpcAction.Scan:
        if (typeof payload !== 'string') throw new Error('Invalid payload');
        return controller.scan(payload);
      default:
        throw new Error('Invalid ipc action');
    }
  });
