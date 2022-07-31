import { app, BrowserWindow } from 'electron';
import path from 'path';

import Logger from './logger';
import AppStorage from './storage/app.storage';

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
  static readonly logger = new Logger({ root: App.dir.log });
  static readonly storage = {
    app: new AppStorage({ root: App.dir.userData })
  };

  static createWindow() {
    const browserWindow = new BrowserWindow({
      ...App.storage.app.get('window'),
      title: 'Doombox',
      minWidth: 320,
      minHeight: 240,
      // frame: process.platform === 'darwin',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    browserWindow.on('resize', () => {
      App.storage.app.set('window', browserWindow.getBounds());
    });

    browserWindow.on('move', () => {
      const [x, y] = browserWindow.getPosition();
      App.storage.app.set('window', { x, y });
    });

    browserWindow.loadFile('renderer/index.html');
  }

  static async run() {
    await app.whenReady();
    App.createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) App.createWindow();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });
  }
}
