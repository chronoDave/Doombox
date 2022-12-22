import type Logger from './logger';
import type Storage from './storage';
import type { ThemeShape } from '../../types/shapes/theme.shape';
import type { AppShape } from '../../types/shapes/app.shape';
import type { Image, Song } from '../../types/library';
import type { IpcRouter } from '../../types/ipc';
import type LeafDB from 'leaf-db';

import {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme
} from 'electron';

import { IpcChannel } from '../../types/ipc';

import createWindow from './window';
import createLibraryController from './ipc/library/library.controller';
import createThemeController from './ipc/theme/theme.controller';
import createLibraryRouter from './ipc/library/library.router';
import createThemeRouter from './ipc/theme/theme.router';

export type AppProps = {
  logger: Logger
  db: {
    songs: LeafDB<Song>
    images: LeafDB<Image>
  }
  storage: {
    app: Storage<AppShape>
    theme: Storage<ThemeShape>
  }
};

export default class App {
  private readonly _router: {
    library: IpcRouter,
    theme: IpcRouter
  };

  private readonly _createWindow: () => BrowserWindow;

  private _window?: BrowserWindow;

  constructor(props: AppProps) {
    this._router = {
      library: createLibraryRouter(createLibraryController({
        db: props.db
      }))(props.logger),
      theme: createThemeRouter(createThemeController({
        storage: props.storage.theme
      }))(props.logger)
    };

    this._createWindow = () => createWindow({
      storage: props.storage.app,
      logger: props.logger
    });

    nativeTheme.themeSource = props.storage.theme.get('theme');
  }

  async run() {
    await app.whenReady();

    ipcMain.handle(IpcChannel.Theme, (_, e) => this._router.theme(_, e));
    ipcMain.handle(IpcChannel.Library, (_, e) => this._router.library(_, e));

    this._window = this._createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this._window = this._createWindow();
      }
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}
