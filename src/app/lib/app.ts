import type AppStorage from './storage/app.storage';
import type ThemeStorage from './storage/theme.storage';
import type Logger from './logger';

import { app, BrowserWindow } from 'electron';

import AppWindow from './window';

export type AppProps = {
  logger: Logger
  storage: {
    app: AppStorage,
    theme: ThemeStorage
  }
};

export default class App {
  private readonly _logger: Logger;
  private readonly _storage: {
    app: AppStorage
    theme: ThemeStorage
  };

  private _window?: AppWindow;

  constructor(props: AppProps) {
    this._logger = props.logger;
    this._storage = props.storage;
  }

  async run() {
    await app.whenReady();

    this._window = new AppWindow({
      storage: this._storage.app,
      logger: this._logger
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this._window = new AppWindow({
          storage: this._storage.app,
          logger: this._logger
        });
      }
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}
