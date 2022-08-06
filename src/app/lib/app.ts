import type AppStorage from './storage/app.storage';
import type ThemeStorage from './storage/theme.storage';
import type Logger from './logger';

import { app, BrowserWindow, ipcMain } from 'electron';

import { IPC_CHANNEL } from '../../types/ipc';

import AppWindow from './window';
import ThemeController from './controller/theme.controller';

export type AppProps = {
  logger: Logger
  storage: {
    app: AppStorage,
    theme: ThemeStorage
  }
};

export default class App {
  private readonly _logger: Logger;
  private readonly _controller: {
    storage: ThemeController;
  };
  private readonly _storage: {
    app: AppStorage
    theme: ThemeStorage
  };

  private _window?: AppWindow;

  constructor(props: AppProps) {
    this._logger = props.logger;
    this._storage = props.storage;
    this._controller = {
      storage: new ThemeController({
        logger: this._logger,
        storage: this._storage.theme
      })
    };
  }

  async run() {
    await app.whenReady();

    ipcMain.handle(IPC_CHANNEL.THEME, (_, event: unknown) => (
      this._controller.storage.route(event)
    ));

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
