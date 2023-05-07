import type { LibraryDatabase } from './types';

import { app, ipcMain, nativeTheme } from 'electron';
import fs from 'fs';
import LeafDB from 'leaf-db';

import { IpcChannel } from '../types/ipc';
import appShape from '../types/shapes/app.shape';
import cacheShape from '../types/shapes/cache.shape';
import themeShape from '../types/shapes/theme.shape';
import userShape from '../types/shapes/user.shape';
import { IS_DEV } from '../utils/const';

import { PATH } from './const';
import createAppController from './controllers/app.controller';
import createCacheController from './controllers/cache.controller';
import createLibraryController from './controllers/library.controller';
import createSearchController from './controllers/search.controller';
import createThemeController from './controllers/theme.controller';
import createUserController from './controllers/user.controller';
import Logger from './lib/logger/logger';
import Storage from './lib/storage/storage';
import createWindow from './lib/window';
import ipcRouterFactory from './utils/createIpcRouter';

/** Initialize directories */
if (IS_DEV) {
  fs.mkdirSync(PATH.USER_DATA, { recursive: true });
  fs.mkdirSync(PATH.APP_DATA, { recursive: true });
  fs.mkdirSync(PATH.ASSETS, { recursive: true });
  fs.mkdirSync(PATH.LOGS, { recursive: true });
}

fs.mkdirSync(PATH.THUMBS, { recursive: true });

/** Initialize entities */
const logger = new Logger({ root: PATH.LOGS });
const library: LibraryDatabase = {
  songs: new LeafDB({ storage: { root: PATH.APP_DATA, name: 'songs' } }),
  albums: new LeafDB({ storage: { root: PATH.APP_DATA, name: 'albums' } }),
  labels: new LeafDB({ storage: { root: PATH.APP_DATA, name: 'labels' } })
};
const storage = {
  app: new Storage({ name: 'app', shape: appShape, root: PATH.APP_DATA }),
  theme: new Storage({ name: 'theme', shape: themeShape, root: PATH.APP_DATA }),
  user: new Storage({ name: 'user', shape: userShape, root: PATH.APP_DATA }),
  cache: new Storage({ name: 'cache', shape: cacheShape, root: PATH.APP_DATA })
};

const createIpcRouter = ipcRouterFactory(logger);
const router = {
  library: createIpcRouter(createLibraryController({
    library,
    root: PATH.THUMBS,
    storage: storage.user
  })),
  user: createIpcRouter(createUserController({
    storage: storage.user
  })),
  theme: createIpcRouter(createThemeController({
    storage: storage.theme
  })),
  cache: createIpcRouter(createCacheController({
    storage: storage.cache
  })),
  app: createIpcRouter(createAppController({
    directory: { thumbs: PATH.THUMBS }
  })),
  search: createIpcRouter(createSearchController({
    library
  }))
};

/** Initialize app */
Object.values(library).forEach(db => db.open());
nativeTheme.themeSource = storage.theme.get().theme;

app.whenReady()
  .then(() => {
    ipcMain.handle(IpcChannel.App, router.app);
    ipcMain.handle(IpcChannel.User, router.user);
    ipcMain.handle(IpcChannel.Theme, router.theme);
    ipcMain.handle(IpcChannel.Cache, router.cache);
    ipcMain.handle(IpcChannel.Library, router.library);
    ipcMain.handle(IpcChannel.Search, router.search);

    createWindow({ storage: storage.app, logger });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });

    app.on('render-process-gone', (e, w, d) => {
      logger.error(new Error(JSON.stringify(d)));
      app.quit();
    });

    app.on('child-process-gone', (e, d) => {
      logger.error(new Error(JSON.stringify(d)));
      app.quit();
    });

    return null;
  })
  .catch(logger.error);
