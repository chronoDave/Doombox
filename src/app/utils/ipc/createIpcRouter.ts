import type { IpcRoute } from '../../../types/ipc';
import type Logger from '../../lib/logger/logger';
import type { IpcMainInvokeEvent, WebContents } from 'electron';

import isIpcEvent from '../../../utils/validation/isIpcEvent';

export default (createController: (sender: WebContents) => ({ [key in IpcRoute]?: Function })) =>
  (logger: Logger) =>
    (event: IpcMainInvokeEvent, ...args: unknown[]) => {
      if (!isIpcEvent(args[0])) {
        const err = new Error(`Invalid ipc event: ${JSON.stringify(args[0])}`);
        logger.error(err);

        return err;
      }

      const { action, payload } = args[0];
      const controller = createController(event.sender);
      if (!(action in controller)) {
        const err = new Error(`Invalid ipc action: ${JSON.stringify(action)}`);
        logger.error(err);

        return err;
      }

      try {
        return controller[action]?.(payload);
      } catch (err) {
        logger.error(err as Error);
        return err;
      }
    };