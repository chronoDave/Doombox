import { app, BrowserWindow } from 'electron';

import type { Point, Rect } from '../../types';

import AppStorage from './storage/app.storage';
import createWindow from './window';

export interface AppProps {
  isDev: boolean
  path: {
    userData: string
    assets: string
  }
}

export default class App {
  private readonly _storage: {
    app: AppStorage
  };

  private _createWindow() {
    return createWindow({
      ...this._storage.app.get('window'),
      onMove: (point: Point) => this._storage.app.set('window', point),
      onResize: (rect: Rect) => this._storage.app.set('window', rect)
    });
  }

  constructor(props: AppProps) {
    this._storage = {
      app: new AppStorage({ root: props.path.userData })
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
