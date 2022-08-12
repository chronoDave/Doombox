import type Storage from './storage';
import type Logger from './logger';
import type { AppShape } from '../../types/shapes/app.shape';

import path from 'path';
import { BrowserWindow, ipcMain } from 'electron';

import { IpcChannel } from '../../types/ipc';

import WindowController from './controller/window.controller';
import router from './router';

export type WindowProps = {
  storage: Storage<AppShape>,
  logger: Logger
};

export default class Window {
  private readonly _window: BrowserWindow;
  private readonly _logger: Logger;
  private readonly _route: ReturnType<typeof router>;
  private readonly _storage: Storage<AppShape>;

  private _handleResize() {
    this._storage.set('window', this._window.getBounds());
  }

  private _handleMove() {
    const [x, y] = this._window.getPosition();
    this._storage.set('window', { x, y });
  }

  constructor(props: WindowProps) {
    this._storage = props.storage;
    this._logger = props.logger;
    this._window = new BrowserWindow({
      ...this._storage.get('window'),
      title: 'Doombox',
      icon: process.platform === 'win32' ?
        path.resolve(__dirname, 'assets/app.ico') :
        path.resolve(__dirname, 'assets/app.png'),
      minWidth: 320,
      minHeight: 240,
      frame: process.platform === 'darwin',
      titleBarStyle: 'hidden',
      webPreferences: {
        enableWebSQL: false,
        preload: path.resolve(__dirname, 'preload.js')
      }
    });
    this._route = router(new WindowController({
      logger: this._logger,
      window: this._window
    }));

    this._window.once('ready-to-show', () => this._window.show());
    this._window.on('resize', () => this._handleResize());
    this._window.on('move', () => this._handleMove());

    ipcMain.on(IpcChannel.Window, (_, event: unknown) => this._route(event));

    this._window.loadFile('renderer/index.html');
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line global-require
      require('chokidar')
        .watch(`${__dirname}/renderer/**/*`)
        .on('change', () => this._window.reload());
    }
  }
}
