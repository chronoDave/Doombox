import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import type { IpcMainInvokeEvent } from 'electron';

import { IpcChannel } from '../../types/ipc';

import Logger from './logger';
import AppStorage from './storage/app.storage';
import ThemeStorage from './storage/theme.storage';
import StorageController from './controller/storage.controller';

export default class App {
  static readonly isDev = process.env.NODE_ENV === 'development';
  static readonly dir = {
    userData: App.isDev ?
      path.resolve(__dirname, '../userData') :
      app.getPath('userData'),
    assets: App.isDev ?
      path.resolve(__dirname, '../build/assets') :
      path.resolve(app.getAppPath(), 'assets'),
    log: App.isDev ?
      path.resolve(__dirname, '../userData/logs') :
      app.getPath('logs')
  };

  private readonly _logger = new Logger({ root: App.dir.log });
  private readonly _storage = {
    app: new AppStorage({ root: App.dir.userData }),
    theme: new ThemeStorage({ root: App.dir.userData })
  };

  private _createWindow() {
    const browserWindow = new BrowserWindow({
      ...this._storage.app.get('window'),
      title: 'Doombox',
      icon: process.platform === 'win32' ?
        path.resolve(App.dir.assets, 'app.ico') :
        path.resolve(App.dir.assets, 'app.png'),
      minWidth: 320,
      minHeight: 240,
      frame: process.platform === 'darwin',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    browserWindow.on('resize', () => {
      this._storage.app.set('window', browserWindow.getBounds());
    });

    browserWindow.on('move', () => {
      const [x, y] = browserWindow.getPosition();
      this._storage.app.set('window', { x, y });
    });

    browserWindow.loadFile('renderer/index.html');
  }

  async run() {
    await app.whenReady();

    const themeStorageController = new StorageController({ storage: this._storage.theme });

    ipcMain.handle(IpcChannel.Theme, async (
      _: IpcMainInvokeEvent,
      event: unknown
    ) => themeStorageController.route(event).catch(err => this._logger.ipc(err)));

    this._createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) this._createWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}
