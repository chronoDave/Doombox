import Ipc, { IpcChannel, IpcController } from '@doombox/ipc';
import { ipcMain } from 'electron';

export default class Router {
  private static instances: string[] = [];

  static unregisterAll() {
    this.instances.forEach(instance => ipcMain.removeAllListeners(instance));
  }

  static register<T extends IpcController<unknown>>(channel: IpcChannel, controller: T) {
    if (!this.instances.includes(channel)) {
      this.instances.push(channel);
      ipcMain.on(channel, (event, payload) => Ipc.route(controller, payload));
      ipcMain.handle(channel, (event, payload) => Ipc.route(controller, payload));
    }
  }
}
