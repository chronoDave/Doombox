import type Logger from './logger';
import type Storage from './storage';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { AppShape } from '../../types/shapes/app.shape';

import {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme
} from 'electron';

import { IpcChannel } from '../../types/ipc';

import AppWindow from './window';
import router from './router';
import ThemeController from './controller/theme.controller';

export type AppProps = {
  logger: Logger
  storage: {
    app: Storage<AppShape>,
    theme: Storage<ThemeShape>
  }
};

export default class App {
  private readonly _logger: Logger;
  private readonly _route: {
    theme: ReturnType<typeof router>;
  };
  private readonly _storage: {
    app: Storage<AppShape>,
    theme: Storage<ThemeShape>
  };

  private _window?: AppWindow;

  constructor(props: AppProps) {
    this._logger = props.logger;
    this._storage = props.storage;
    this._route = {
      theme: router(new ThemeController({
        logger: this._logger,
        storage: this._storage.theme
      }))
    };

    nativeTheme.themeSource = this._storage.theme.get('theme');
  }

  async run() {
    await app.whenReady();

    ipcMain.handle(IpcChannel.Theme, (_, event: unknown) => this._route.theme(event));

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
