import type { Album, Label, Song } from '../types/library';
import type { Playlist } from '../types/playlist';

import { app, ipcMain, nativeTheme } from 'electron';
import fs from 'fs';
import LeafDB from 'leaf-db';

import { IpcChannel } from '../types/ipc';
import appShape from '../types/shapes/app.shape';
import cacheShape from '../types/shapes/cache.shape';
import themeShape from '../types/shapes/theme.shape';
import userShape from '../types/shapes/user.shape';
import { IS_DEV } from '../utils/const';
import createTokenizer from '../utils/tokenizer/kuromoji';

import { PATH } from './const';
import createAppController from './controllers/app.controller';
import createCacheController from './controllers/cache.controller';
import createLibraryController from './controllers/library.controller';
import createPlayerController from './controllers/player.controller';
import createPlaylistController from './controllers/playlist.controller';
import createThemeController from './controllers/theme.controller';
import createUserController from './controllers/user.controller';
import Library from './lib/library/library';
import Logger from './lib/logger/logger';
import Parser from './lib/parser/parser';
import Storage from './lib/storage/storage';
import Transliterator from './lib/transliterator/transliterator';
import createWindow from './lib/window';
import ipcRouterFactory from './utils/createIpcRouter';

/** Initialize directories */
if (IS_DEV) {
  fs.mkdirSync(PATH.USER_DATA, { recursive: true });
  fs.mkdirSync(PATH.APP_DATA, { recursive: true });
  fs.mkdirSync(PATH.ASSETS, { recursive: true });
  fs.mkdirSync(PATH.LOGS, { recursive: true });
}

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
    app: new Storage({ name: 'app', shape: appShape, root: PATH.APP_DATA }),
    theme: new Storage({ name: 'theme', shape: themeShape, root: PATH.USER_DATA }),
    user: new Storage({ name: 'user', shape: userShape, root: PATH.USER_DATA }),
    cache: new Storage({ name: 'cache', shape: cacheShape, root: PATH.APP_DATA })
  };

  const window = createWindow({
    storage: storage.app,
    thumbs: PATH.THUMBS,
    logger
  });
  const createIpcRouter = ipcRouterFactory(logger);
  const router = {
    library: createIpcRouter(createLibraryController({
      library,
      storage: storage.user,
      db
    })),
    playlist: createIpcRouter(createPlaylistController({
      db: db.playlist
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
    app: createIpcRouter(createAppController()),
    player: createIpcRouter(createPlayerController({
      window
    }))
  };

  /** Initialize app */
  nativeTheme.themeSource = storage.theme.get().theme;

  /** Launch */
  await app.whenReady();
  Object.values(db).forEach(x => x.open());

  ipcMain.handle(IpcChannel.App, router.app);
  ipcMain.handle(IpcChannel.User, router.user);
  ipcMain.handle(IpcChannel.Theme, router.theme);
  ipcMain.handle(IpcChannel.Cache, router.cache);
  ipcMain.handle(IpcChannel.Library, router.library);
  ipcMain.handle(IpcChannel.Playlist, router.playlist);
  ipcMain.on(IpcChannel.Player, router.player);

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
};

run();
