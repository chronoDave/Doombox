import { IpcChannel, IpcPayload, IPC_ACTIONS } from '@doombox-types';
import { ipcMain } from 'electron';

import { IpcController } from './controller/controller';
import Reporter from './reporter';

export default class IpcRouter {
  private static instances: Record<string, IpcRouter> = {};

  static register(channel: IpcChannel, controller: IpcController) {
    if (!(channel in IpcRouter.instances)) {
      IpcRouter.instances[channel] = new IpcRouter(channel, controller);
    }
  }

  static unregisterAll() {
    Object.keys(this.instances)
      .forEach(channel => ipcMain.removeHandler(channel));
  }

  private isObject(x: unknown): x is Partial<IpcPayload> {
    return x !== null && !Array.isArray(x) && typeof x === 'object';
  }

  private isIpcPayload(x: Partial<IpcPayload>): x is IpcPayload {
    return !!x.action && IPC_ACTIONS.includes(x.action);
  }

  private route(controller: IpcController, payload: unknown): Promise<unknown> {
    try {
      if (!this.isObject(payload)) {
        throw new Error(`Payload must be an object: ${JSON.stringify(payload)}`);
      }
      if (!this.isIpcPayload(payload)) {
        throw new Error(`Invalid payload action: ${JSON.stringify(payload.action)}`);
      }

      const handler = controller[payload.action];
      if (!handler) {
        throw new Error(`Missing handler: ${payload.action}`);
      }

      return handler(payload);
    } catch (err) {
      Reporter.error('Router', err);
      return Promise.reject(err);
    }
  }

  constructor(channel: IpcChannel, controller: IpcController) {
    ipcMain.handle(channel, (event, payload) => this.route(controller, payload));
  }
}
