import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import type { IpcMainInvokeEvent } from 'electron';

import { IpcChannel } from '../../types/ipc';

import AppStorage from './storage/app.storage';
import ThemeStorage from './storage/theme.storage';
import StorageController from './controller/storage.controller';
import { ThemeShape } from '../../types/shapes/theme.shape';

export type AppProps = {
  dir: {
    assets: string
    userData: string
  }
};

export default class App {
  private readonly _dir: {
    assets: string
    userData: string
  };

  private readonly _storage: {
    app: AppStorage
    theme: ThemeStorage
  };

  private readonly _controllers: {
    theme: StorageController<ThemeShape>
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

    ipcMain.on(IpcChannel.Theme, async (
      _: IpcMainInvokeEvent,
      event: unknown
    ) => this._controllers.theme.route(event)
      .then(payload => browserWindow.webContents.send(IpcChannel.Theme, payload)));

    browserWindow.loadFile('renderer/index.html');
  }

  constructor(props: AppProps) {
    this._dir = props.dir;

    this._storage = {
      app: new AppStorage({ root: this._dir.userData }),
      theme: new ThemeStorage({ root: this._dir.userData })
    };

    this._controllers = {
      theme: new StorageController({ storage: this._storage.theme })
    };
  }

  async run() {
    await app.whenReady();

    this._createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) this._createWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}
