const chokidar = process.env.NODE_ENV === 'development' ?
  require('chokidar') :
  null;
const { app } = require('electron');
const path = require('path');

const LeafDB = require('leaf-db').default;
const debounce = require('lodash.debounce');

const { TYPES, IPC } = require('@doombox-utils/types');
const { CACHE, CONFIG, THEME } = require('@doombox-config');

// Core
const { App } = require('./app');
const {
  StorageController,
  LibraryController,
  SongController,
  LabelController,
  AlbumController,
  ImageController
} = require('./controllers');
const { Storage } = require('./storage');

const root = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../userData') :
  app.getPath('userData');
const assets = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();

const cache = new Storage(root, 'cache', CACHE);
const config = new Storage(root, 'config', CONFIG);
const theme = new Storage(root, 'theme', THEME);

const db = {
  [TYPES.DATABASE.IMAGES]: new LeafDB(TYPES.DATABASE.IMAGES, { root }),
  [TYPES.DATABASE.SONGS]: new LeafDB(TYPES.DATABASE.SONGS, { root }),
  [TYPES.DATABASE.ALBUMS]: new LeafDB(TYPES.DATABASE.ALBUMS, { root }),
  [TYPES.DATABASE.LABELS]: new LeafDB(TYPES.DATABASE.LABELS, { root })
};

const Doombox = new App(root, assets, config.get(TYPES.CONFIG.LANGUAGE));

app.on('ready', () => {
  Doombox.createRouter(IPC.CHANNEL.CACHE, new StorageController(cache));
  Doombox.createRouter(IPC.CHANNEL.CONFIG, new StorageController(config));
  Doombox.createRouter(IPC.CHANNEL.THEME, new StorageController(theme));

  Doombox.createRouter(IPC.CHANNEL.IMAGE, new ImageController(db[TYPES.DATABASE.IMAGES]));
  Doombox.createRouter(IPC.CHANNEL.SONG, new SongController(db[TYPES.DATABASE.SONGS]));
  Doombox.createRouter(IPC.CHANNEL.ALBUM, new AlbumController(db[TYPES.DATABASE.ALBUMS]));
  Doombox.createRouter(IPC.CHANNEL.LABEL, new LabelController(db[TYPES.DATABASE.LABELS]));

  Doombox.createRouter(IPC.CHANNEL.LIBRARY, new LibraryController(db, {
    ...config.get(TYPES.CONFIG.PARSER),
    folder: path.resolve(root, 'images')
  }));

  const window = Doombox.createWindow({
    ...cache.get(TYPES.CACHE.WINDOW),
    darkTheme: theme.get('variant') === 'dark',
    backgroundColor: theme.get('grey')[1]
  });

  if (process.platform === 'darwin') {
    Doombox.createMenuMac(window, config.get(TYPES.CONFIG.KEYBINDS));
  } else {
    Doombox.createMenuWindows(window);
  }

  if (chokidar) {
    chokidar
      .watch(`${assets}/client/**/*`)
      .on('change', () => window.reload());
  }

  const handleResize = debounce(() => {
    const { width, height } = window.getBounds();
    cache.set({ width, height }, TYPES.CACHE.WINDOW);
  }, 100);
  const handleMove = debounce(() => {
    const [x, y] = window.getPosition();
    cache.set({ x, y }, TYPES.CACHE.WINDOW);
  }, 100);

  window.on('resize', handleResize);
  window.on('move', handleMove);
});

app.on('window-all-closed', () => {
  app.removeAllListeners();
  app.quit();
});
