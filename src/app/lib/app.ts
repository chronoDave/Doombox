import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import type { IpcMainInvokeEvent } from 'electron';

import { IpcChannel } from '../../types/ipc';

import AppStorage from './storage/app.storage';
import ThemeStorage from './storage/theme.storage';
import StorageController from './controller/storage.controller';

export default class App {
  private readonly _isDev = process.env.NODE_ENV === 'development';
  private readonly _dir = {
    userData: this._isDev ?
      path.resolve(__dirname, '../userData') :
      app.getPath('userData'),
    assets: this._isDev ?
      path.resolve(__dirname, '../build/assets') :
      path.resolve(app.getAppPath(), 'assets')
  };

  private readonly _storage = {
    app: new AppStorage({ root: this._dir.userData }),
    theme: new ThemeStorage({ root: this._dir.userData })
  };

  private _createWindow() {
    const browserWindow = new BrowserWindow({
      ...this._storage.app.get('window'),
      title: 'Doombox',
      icon: process.platform === 'win32' ?
        path.resolve(this._dir.assets, 'app.ico') :
        path.resolve(this._dir.assets, 'app.png'),
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
    ) => themeStorageController.route(event));

    this._createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) this._createWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}
