import type Controller from './controller/controller';

import { IpcAction } from '../../types/ipc';
import { isIpcEvent } from '../../utils/validation';

export default (controller: Controller) => (event: unknown): Promise<unknown> => {
  const routes: Record<IpcAction, ((payload: unknown) => Promise<unknown>) | undefined> = {
    [IpcAction.Get]: controller.get?.bind(controller),
    [IpcAction.Set]: controller.set?.bind(controller),
    [IpcAction.Minimize]: controller.minimize?.bind(controller),
    [IpcAction.Maximize]: controller.maximize?.bind(controller),
    [IpcAction.Close]: controller.close?.bind(controller)
  };

  if (!isIpcEvent(event)) return Promise.reject(new Error('Invalid ipc event'));
  if (!(event.action in routes)) return Promise.reject(new Error('Invalid ipc action'));

  const action = routes[event.action];
  if (!action) return Promise.reject(new Error('Missing implementation in controller'));
  return action(event.payload);
};
