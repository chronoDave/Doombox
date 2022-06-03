const { app, globalShortcut } = require('electron');
const path = require('path');
const LeafDB = require('leaf-db').default;
const { TYPES, IPC } = require('@doombox-utils/types');
const { THEME } = require('@doombox-config');

// Core
const DatabaseController = require('./controllers/database.controller');
const StorageController = require('./controllers/storage.controller');
const LibraryController = require('./controllers/library.controller');
const Router = require('./router');
const Window = require('./window');
const Cache = require('./storage/storage.cache');
const Config = require('./storage/storage.config');

const root = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../userData') :
  app.getPath('userData');
const assets = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();

const cache = new Cache(root);
const config = new Config(root);
const router = new Router(root);
const window = new Window(root, assets, cache, config.get(TYPES.CONFIG.KEYBINDS));
const db = {
  [TYPES.DATABASE.IMAGES]: new LeafDB(TYPES.DATABASE.IMAGES, { root }),
  [TYPES.DATABASE.SONGS]: new LeafDB(TYPES.DATABASE.SONGS, { root }),
  [TYPES.DATABASE.ALBUMS]: new LeafDB(TYPES.DATABASE.ALBUMS, { root }),
  [TYPES.DATABASE.LABELS]: new LeafDB(TYPES.DATABASE.LABELS, { root }),
  [TYPES.DATABASE.PLAYLISTS]: new LeafDB(TYPES.DATABASE.PLAYLISTS, { root })
};

app.on('ready', () => {
  router.bind(IPC.CHANNEL.CACHE, new StorageController(cache));
  router.bind(IPC.CHANNEL.CONFIG, new StorageController(config));
  router.bind(IPC.CHANNEL.IMAGE, new DatabaseController(db[TYPES.DATABASE.IMAGES]));
  router.bind(IPC.CHANNEL.SONG, new DatabaseController(db[TYPES.DATABASE.SONGS]));
  router.bind(IPC.CHANNEL.ALBUM, new DatabaseController(db[TYPES.DATABASE.ALBUMS]));
  router.bind(IPC.CHANNEL.LABEL, new DatabaseController(db[TYPES.DATABASE.LABELS]));
  router.bind(IPC.CHANNEL.PLAYLIST, new DatabaseController(db[TYPES.DATABASE.PLAYLISTS]));
  router.bind(IPC.CHANNEL.LIBRARY, new LibraryController(
    db,
    path.resolve(root, 'images'),
    config.get(TYPES.CONFIG.PARSER)
  ));

  window.create(
    config.get(TYPES.CONFIG.DISPLAY).theme === 'dark',
    config.get(TYPES.CONFIG.DISPLAY).theme === 'dark' ?
      THEME[config.get(TYPES.CONFIG.DISPLAY).theme].grey[1] :
      THEME[config.get(TYPES.CONFIG.DISPLAY).theme].grey[5]
  );
});

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();

  app.removeAllListeners();
  app.quit();
});
