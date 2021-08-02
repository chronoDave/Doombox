import Ipc, { IpcChannel, IpcController, IpcPayload } from '@doombox/ipc';
import { ipcMain } from 'electron';

import Reporter from './reporter/reporter';

export default class Router {
  private static instances: string[] = [];

  static unregisterAll() {
    this.instances.forEach(instance => ipcMain.removeAllListeners(instance));
  }

  static register<T extends IpcChannel>(channel: T, controller: IpcController<T>) {
    if (!this.instances.includes(channel)) {
      this.instances.push(channel);
      ipcMain.on(channel, (event, payload) => Ipc.route(controller, payload).catch(error => Reporter.error('Router', error, `ipcMain failed to handle request on channel ${channel}`)));
      ipcMain.handle(channel, async (event, payload): Promise<IpcPayload<T>> => {
        try {
          const data = await Ipc.route(controller, payload);
          return ({ action: payload.action, data });
        } catch (error) {
          Reporter.error('Router', error, `ipcMain failed to handle request on channel ${channel}`);
          return ({ action: payload.action, data: {}, error });
        }
      });
    }
  }
}
