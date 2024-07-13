import type { Album, Label, Song } from '../types/library';
import type { Playlist } from '../types/playlist';

import { app, nativeTheme } from 'electron';
import fs from 'fs';
import LeafDB from 'leaf-db';

import { IS_DEV } from '../lib/const';
import Storage from '../lib/storage/storage';
import Tokenizer from '../lib/tokenizer/tokenizer';
import Transliterator from '../lib/transliterator/transliterator';
import cacheShape from '../types/shapes/cache.shape';
import themeShape from '../types/shapes/theme.shape';
import userShape from '../types/shapes/user.shape';

import { PATH } from './const';
import createCacheController from './controllers/cache.controller';
import createLibraryController from './controllers/library.controller';
import osController from './controllers/os.controller';
import playerController from './controllers/player.controller';
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
import WindowApp from './windows/app/app';

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

  const storage = {
    theme: new Storage({ file: { name: 'theme', root: PATH.USER_DATA }, shape: themeShape }),
    user: new Storage({ file: { name: 'user', root: PATH.USER_DATA }, shape: userShape }),
    cache: new Storage({ file: { name: 'cache', root: PATH.APP_DATA }, shape: cacheShape })
  };

  const window = new WindowApp(PATH.CACHE);

  const library = new Library({
    parser: new Parser({ transliterator }),
    root: PATH.THUMBS,
    db
  })
    .on('image', window.send('image'))
    .on('song', window.send('song'));

  /** Initialize app */
  storage.theme.on(theme => {
    nativeTheme.themeSource = theme.theme;
  });
  nativeTheme.themeSource = storage.theme.state.theme;

  Object.values(db).forEach(x => x.open());

  ipcRouter
    .transfer('os', osController({ root: { thumbs: PATH.THUMBS } }))
    .transfer('user', createUserController({ storage: storage.user }))
    .transfer('theme', createThemeController({ storage: storage.theme }))
    .transfer('cache', createCacheController({ storage: storage.cache }))
    .transfer('library', createLibraryController({
      library,
      storage: storage.user,
      db
    }))
    .transfer('playlist', createPlaylistController({ db: db.playlist }))
    .transfer('search', createSearchController({ db }))
    .receive('router', createRouterController({ root: PATH.CACHE }))
    .receive('window', windowController)
    .receive('player', playerController)
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
  window.show();
};

run();
