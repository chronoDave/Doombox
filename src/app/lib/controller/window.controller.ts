import type { BrowserWindow } from 'electron';
import type { ControllerProps } from './controller';

import { isIpcEvent } from '../../../utils/validation';

import Controller from './controller';

export type WindowControllerProps = ControllerProps & {
  window: BrowserWindow
};

export default class WindowController extends Controller {
  private readonly _window: BrowserWindow;

  private _minimize() {
    this._window.minimize();
  }

  private _maximize() {
    if (this._window.isMaximized()) {
      this._window.unmaximize();
    } else {
      this._window.maximize();
    }
  }

  private _close() {
    this._window.close();
  }

  constructor(props: WindowControllerProps) {
    super(props);

    this._window = props.window;
  }

  route(event: unknown) {
    return new Promise((resolve, reject) => {
      if (!isIpcEvent(event)) return reject(this.log('Invalid ipc event', event));
      if (event.action === 'MINIMIZE') return resolve(this._minimize());
      if (event.action === 'MAXIMIZE') return resolve(this._maximize());
      if (event.action === 'CLOSE') return resolve(this._close());
      return reject(this.log('Invalid action', event));
    });
  }
}
