import type { Album, Label, Song } from '../types/library';
import type { Playlist } from '../types/playlist';

import { app, nativeTheme } from 'electron';
import fs from 'fs';
import LeafDB from 'leaf-db';

import { IS_DEV } from '../lib/const';
import Tokenizer from '../lib/tokenizer/tokenizer';
import Transliterator from '../lib/transliterator/transliterator';
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
import windowController from './controllers/window.controller';
import IpcRouter from './lib/ipc/router';
import Library from './lib/library/library';
import Logger from './lib/logger/logger';
import Parser from './lib/parser/parser';
import Storage from './lib/storage/storage';
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
  const tokenizer = await Tokenizer.create(PATH.DICT);
  const transliterator = new Transliterator(tokenizer);
  const ipcRouter = new IpcRouter();

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
    app: new AppWindow({ dir: { cache: PATH.CACHE, thumbs: PATH.THUMBS } }),
    settings: new SettingsWindow({ root: PATH.CACHE, logger })
  };

  /** Initialize app */
  nativeTheme.themeSource = storage.theme.get().theme;
  Object.values(db).forEach(x => x.open());

  ipcRouter
    .transfer(IpcChannel.App, createAppController())
    .transfer(IpcChannel.User, createUserController({ storage: storage.user }))
    .transfer(IpcChannel.Theme, createThemeController({ storage: storage.theme }))
    .transfer(IpcChannel.Cache, createCacheController({ storage: storage.cache }))
    .transfer(IpcChannel.Library, createLibraryController({ library, storage: storage.user, db }))
    .transfer(IpcChannel.Playlist, createPlaylistController({ db: db.playlist }))
    .transfer(IpcChannel.Search, createSearchController({ db }))
    .receive(IpcChannel.Router, createRouterController({ settings: window.settings }))
    .receive(IpcChannel.Window, windowController)
    .on('error', logger.error);

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
