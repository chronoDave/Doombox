import type { Album, Label, Song } from '../types/library';
import type { Playlist } from '../types/playlist';

import { app, ipcMain, nativeTheme } from 'electron';
import fs from 'fs';
import LeafDB from 'leaf-db';

import { IS_DEV } from '../lib/const';
import { IpcChannel } from '../types/ipc';
import cacheShape from '../types/shapes/cache.shape';
import themeShape from '../types/shapes/theme.shape';
import userShape from '../types/shapes/user.shape';

import { PATH } from './const';
import createAppController from './controllers/app.controller';
import createCacheController from './controllers/cache.controller';
import createLibraryController from './controllers/library.controller';
import createPlaylistController from './controllers/playlist.controller';
import createRouterController from './controllers/router.controller';
import createSearchController from './controllers/search.controller';
import createThemeController from './controllers/theme.controller';
import createUserController from './controllers/user.controller';
import createIpcRouter from './lib/ipc/router';
import Library from './lib/library/library';
import Logger from './lib/logger/logger';
import Parser from './lib/parser/parser';
import Storage from './lib/storage/storage';
import createTokenizer from './lib/tokenizer/tokenizer';
import Transliterator from './lib/transliterator/transliterator';
import AppWindow from './windows/app/app';
import SettingsWindow from './windows/settings/settings';

/** Initialize directories */
if (IS_DEV) {
  fs.mkdirSync(PATH.USER_DATA, { recursive: true });
  fs.mkdirSync(PATH.APP_DATA, { recursive: true });
  fs.mkdirSync(PATH.ASSETS, { recursive: true });
  fs.mkdirSync(PATH.LOGS, { recursive: true });
}

fs.mkdirSync(PATH.CACHE, { recursive: true });

const run = async () => {
  /** Initialize entities */
  const logger = new Logger({ root: PATH.LOGS });
  const tokenizer = await createTokenizer(PATH.DICT);
  const transliterator = new Transliterator({ tokenizer });

  const db: {
    song: LeafDB<Song>,
    album: LeafDB<Album>,
    label: LeafDB<Label>,
    playlist: LeafDB<Playlist>
  } = {
    song: new LeafDB({ storage: { root: PATH.APP_DATA, name: 'songs' } }),
    album: new LeafDB({ storage: { root: PATH.APP_DATA, name: 'albums' } }),
    label: new LeafDB({ storage: { root: PATH.APP_DATA, name: 'labels' } }),
    playlist: new LeafDB({ storage: { root: PATH.APP_DATA, name: 'playlists' } })
  };
  const library = new Library({
    parser: new Parser({ transliterator }),
    root: PATH.THUMBS,
    db
  });
  const storage = {
    theme: new Storage({ name: 'theme', shape: themeShape, root: PATH.USER_DATA }),
    user: new Storage({ name: 'user', shape: userShape, root: PATH.USER_DATA }),
    cache: new Storage({ name: 'cache', shape: cacheShape, root: PATH.APP_DATA })
  };

  const window = {
    app: new AppWindow({ dir: { cache: PATH.CACHE, thumbs: PATH.THUMBS }, logger }),
    settings: new SettingsWindow({ root: PATH.CACHE, logger })
  };

  const ipcRouter = createIpcRouter(logger);

  const router = {
    library: ipcRouter(createLibraryController({
      library,
      storage: storage.user,
      db
    })),
    playlist: ipcRouter(createPlaylistController({
      db: db.playlist
    })),
    user: ipcRouter(createUserController({
      storage: storage.user
    })),
    theme: ipcRouter(createThemeController({
      storage: storage.theme
    })),
    cache: ipcRouter(createCacheController({
      storage: storage.cache
    })),
    app: ipcRouter(createAppController()),
    router: ipcRouter(createRouterController({
      settings: window.settings
    })),
    search: ipcRouter(createSearchController({
      db
    }))
  };

  /** Initialize app */
  nativeTheme.themeSource = storage.theme.get().theme;
  Object.values(db).forEach(x => x.open());
  ipcMain.handle(IpcChannel.App, router.app);
  ipcMain.handle(IpcChannel.User, router.user);
  ipcMain.handle(IpcChannel.Theme, router.theme);
  ipcMain.handle(IpcChannel.Cache, router.cache);
  ipcMain.handle(IpcChannel.Library, router.library);
  ipcMain.handle(IpcChannel.Playlist, router.playlist);
  ipcMain.handle(IpcChannel.Search, router.search);
  ipcMain.on(IpcChannel.App, router.app);
  ipcMain.on(IpcChannel.Router, router.router);

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

  app.on('quit', () => {
    Object.values(db).forEach(x => x.close());
  });

  /** Launch */
  await app.whenReady();
  await window.app.show();
};

run();
