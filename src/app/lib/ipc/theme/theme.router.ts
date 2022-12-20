import type { IpcChannel, IpcEvent, IpcInvokeController } from '../../../../types/ipc';
import type { ThemeShape } from '../../../../types/shapes/theme.shape';

import { IpcAction } from '../../../../types/ipc';
import { isIpcPayloadGet, isIpcPayloadSet } from '../../../../utils/validation';
import { createIpcRouter } from '../utils';

export default (controller: IpcInvokeController[IpcChannel.Theme]) =>
  createIpcRouter(({ action, payload }: IpcEvent): Promise<unknown> => {
    switch (action) {
      case IpcAction.Get:
        if (!isIpcPayloadGet<ThemeShape>(payload)) throw new Error('Invalid payload');
        return controller.get(payload);
      case IpcAction.Set:
        if (!isIpcPayloadSet<ThemeShape>(payload)) throw new Error('Invalid payload');
        return controller.set(payload);
      default:
        throw new Error('Invalid ipc action');
    }
  });
