import type { IpcAction } from '../../../types/ipc';
import type Logger from '../logger';

import { isIpcEvent } from '../../../utils/validation';

export const createIpcRouter = (controller: { [key in IpcAction]?: Function }) =>
  (logger: Logger) =>
    (_: unknown, ...args: unknown[]) => {
      if (!isIpcEvent(args[0])) {
        const err = new Error(`Invalid ipc event: ${JSON.stringify(args[0])}`);
        logger.error(err);

        return err;
      }

      const { action, payload } = args[0];
      if (!(action in controller)) {
        const err = new Error(`Invalid ipc action: ${JSON.stringify(action)}`);
        logger.error(err);

        return err;
      }

      return controller[action]?.(payload);
    };
