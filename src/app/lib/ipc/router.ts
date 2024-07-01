import type { IpcChannel, IpcEvent, IpcSendController } from '@doombox/types/ipc';
import type { WebContents } from 'electron';

import { BrowserWindow, ipcMain } from 'electron';

import EventEmitter from '@doombox/lib/eventEmitter/eventEmitter';
import isObject from '@doombox/lib/validation/isObject';
import { IpcRoute } from '@doombox/types/ipc';

export type RouterEvents = {
  error: (err: Error) => void
};

export type Controller = {
  [key in IpcRoute]?: Function
};

export default class Router extends EventEmitter<RouterEvents> {
  static isEvent(x: unknown): x is IpcEvent {
    return isObject(x) &&
      typeof x.action === 'string' &&
      Object.values<string>(IpcRoute).includes(x.action);
  }

  /** Renderer to main (one-way) */
  receive<T extends keyof IpcSendController>(
    channel: T,
    controller: IpcSendController[T]
  ) {
    ipcMain.on(channel, (event, ...args) => {
      if (!Router.isEvent(args[0])) return this.emit('error', new Error(`Invalid event: ${JSON.stringify(args[0])}`));

      const { action, payload } = args[0];
      if (!(action in controller)) return this.emit('error', new Error(`Invalid route: ${JSON.stringify(action)}`));

      // @ts-expect-error: Won't type narrow correctly, caught by 'in' check
      return (controller[action])({
        payload,
        window: BrowserWindow.fromWebContents(event.sender)
      });
    });

    return this;
  }

  /** Renderer to main (two-way) */
  transfer<T extends Controller>(
    channel: IpcChannel,
    controller: (sender: WebContents) => T
  ) {
    ipcMain.handle(channel, (event, ...args) => {
      if (!Router.isEvent(args[0])) return this.emit('error', new Error(`Invalid event: ${JSON.stringify(args[0])}`));

      const { action, payload } = args[0];
      if (!(action in controller(event.sender))) return this.emit('error', new Error(`Invalid route: ${JSON.stringify(action)}`));

      return controller(event.sender)[action]?.(payload);
    });

    return this;
  }
}
