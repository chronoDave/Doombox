import type { BrowserWindow } from 'electron';
import type { ControllerProps } from './controller';

import Controller from './controller';

export type WindowControllerProps = ControllerProps & {
  window: BrowserWindow
};

export default class WindowController extends Controller {
  private readonly _window: BrowserWindow;

  minimize() {
    return Promise.resolve(this._window.minimize());
  }

  maximize() {
    if (this._window.isMaximized()) {
      this._window.unmaximize();
    } else {
      this._window.maximize();
    }

    return Promise.resolve();
  }

  close() {
    return Promise.resolve(this._window.close());
  }

  constructor(props: WindowControllerProps) {
    super(props);

    this._window = props.window;
  }
}
