import type { ReceiveController, Event, TransferController } from '@doombox/types/ipc';

import { BrowserWindow, ipcMain } from 'electron';

import EventEmitter from '@doombox/lib/eventEmitter/eventEmitter';
import isObject from '@doombox/lib/validation/isObject';

export type RouterEvents = {
  error: (err: Error) => void
};

export default class Router extends EventEmitter<RouterEvents> {
  static isEvent(x: unknown): x is Event {
    return (
      isObject(x) &&
      typeof x.route === 'string'
    );
  }

  /** Renderer to main (one-way) */
  receive<T extends keyof ReceiveController>(
    channel: T,
    controller: ReceiveController[T]
  ) {
    ipcMain.on(channel, (event, ...args) => {
      if (!Router.isEvent(args[0])) return this.emit('error', new Error(`Invalid event: ${JSON.stringify(args[0])}`));

      const { route, payload } = args[0];
      if (!(route in controller)) return this.emit('error', new Error(`Invalid route: ${JSON.stringify(route)}`));

      // @ts-expect-error: Won't type narrow correctly, caught by 'in' check
      return controller[route](payload, BrowserWindow.fromWebContents(event.sender));
    });

    return this;
  }

  /** Renderer to main (two-way) */
  transfer<T extends keyof TransferController>(
    channel: T,
    controller: TransferController[T]
  ) {
    ipcMain.handle(channel, (event, ...args) => {
      if (!Router.isEvent(args[0])) return this.emit('error', new Error(`Invalid event: ${JSON.stringify(args[0])}`));

      const { route, payload } = args[0];
      if (!(route in controller)) return this.emit('error', new Error(`Invalid route: ${JSON.stringify(route)}`));

      // @ts-expect-error: Won't type narrow correctly, caught by 'in' check
      return (controller[route])(payload, BrowserWindow.fromWebContents(event.sender));
    });

    return this;
  }
}
