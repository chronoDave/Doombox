import type { Album, Label, Song } from '../../types/library';

import { app as electron, ipcMain, nativeTheme } from 'electron';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LeafDB from 'leaf-db';

import { IpcChannel } from '../../types/ipc';
import appShape from '../../types/shapes/app.shape';
import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';

import createAppController from './controllers/app.controller';
import createLibraryController from './controllers/library/library.controller';
import createThemeController from './controllers/theme.controller';
import createUserController from './controllers/user.controller';
import Logger from './logger';
import Storage from './storage';
import createIpcRouter from './utils/createIpcRouter';
import createWindow from './window';

export type AppRoot = {
  userData: string
  appData: string
  assets: string
  logs: string
  dict: string
  covers: string
};

export default async (root: AppRoot) => {
  const logger = new Logger({ root: root.logs });

  const analyzer = new Kuroshiro();
  await analyzer.init(new KuromojiAnalyzer({ dictPath: root.dict }))
    .catch(err => logger.error(new Error(JSON.stringify(err))));

  const db = {
    songs: new LeafDB<Song>({ storage: { root: root.appData, name: 'songs' } }),
    albums: new LeafDB<Album>({ storage: { root: root.appData, name: 'albums' } }),
    labels: new LeafDB<Label>({ storage: { root: root.appData, name: 'labels' } })
  };
  const storage = {
    app: new Storage({ name: 'app', shape: appShape, root: root.appData }),
    theme: new Storage({ name: 'theme', shape: themeShape, root: root.userData }),
    user: new Storage({ name: 'user', shape: userShape, root: root.userData })
  };
  const router = {
    library: createIpcRouter(createLibraryController({
      db,
      root: root.covers,
      analyzer,
      storage: storage.user
    }))(logger),
    user: createIpcRouter(createUserController({
      storage: storage.user
    }))(logger),
    theme: createIpcRouter(createThemeController({
      storage: storage.theme
    }))(logger),
    app: createIpcRouter(createAppController())(logger)
  };

  Object.values(db).forEach(x => x.open());
  nativeTheme.themeSource = storage.theme.get('theme');

  await electron.whenReady();

  ipcMain.handle(IpcChannel.App, router.app);
  ipcMain.handle(IpcChannel.User, router.user);
  ipcMain.handle(IpcChannel.Theme, router.theme);
  ipcMain.handle(IpcChannel.Library, (...args) => router.library(...args));

  createWindow({ storage: storage.app, logger });

  electron.on('window-all-closed', () => {
    if (process.platform !== 'darwin') electron.quit();
  });

  electron.on('render-process-gone', (e, w, d) => {
    logger.error(new Error(JSON.stringify(d)));
    electron.quit();
  });

  electron.on('child-process-gone', (e, d) => {
    logger.error(new Error(JSON.stringify(d)));
    electron.quit();
  });
};
