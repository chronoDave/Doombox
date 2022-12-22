import type { IpcEvent } from '../../../types/ipc';
import type Logger from '../logger';

import { isIpcEvent } from '../../../utils/validation';

export const createIpcRouter = (router: (event: IpcEvent) => unknown) =>
  (logger: Logger) =>
    (_: unknown, ...args: unknown[]) => {
      if (!isIpcEvent(args[0])) {
        const err = new Error(`Invalid ipc event: ${JSON.stringify(args[0])}`);
        logger.error(err);

        return err;
      }

      return router(args[0]);
    };
