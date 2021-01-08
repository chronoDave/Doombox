const chokidar = process.env.NODE_ENV === 'development' ?
  require('chokidar') :
  null;
const { app, globalShortcut } = require('electron');
const path = require('path');

const LeafDB = require('leaf-db').default;
const debounce = require('lodash.debounce');

const { pascalize } = require('@doombox-utils');
const { TYPES, IPC } = require('@doombox-utils/types');
const { CACHE, CONFIG, THEME } = require('@doombox-config');

// Core
const App = require('./app');
const {
  DatabaseController,
  StorageController,
  LibraryController
} = require('./controllers');
const Storage = require('./storage');

const root = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../userData') :
  app.getPath('userData');
const assets = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();

const cache = new Storage(root, 'cache', CACHE);
const config = new Storage(root, 'config', CONFIG);

const configDisplay = config.get(TYPES.CONFIG.DISPLAY);

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

  Doombox.createRouter(IPC.CHANNEL.IMAGE, new DatabaseController(db[TYPES.DATABASE.IMAGES]));
  Doombox.createRouter(IPC.CHANNEL.SONG, new DatabaseController(db[TYPES.DATABASE.SONGS]));
  Doombox.createRouter(IPC.CHANNEL.ALBUM, new DatabaseController(db[TYPES.DATABASE.ALBUMS]));
  Doombox.createRouter(IPC.CHANNEL.LABEL, new DatabaseController(db[TYPES.DATABASE.LABELS]));

  Doombox.createRouter(IPC.CHANNEL.LIBRARY, new LibraryController(
    db,
    path.resolve(root, 'images'),
    config.get(TYPES.CONFIG.PARSER)
  ));

  const keybinds = config.get(TYPES.CONFIG.KEYBINDS);
  const window = Doombox.createWindow({
    ...cache.get(TYPES.CACHE.WINDOW),
    darkTheme: THEME[configDisplay.theme].dark,
    backgroundColor: THEME[configDisplay.theme].dark ?
      THEME[configDisplay.theme].grey[1] :
      THEME[configDisplay.theme].grey[5]
  });

  if (process.platform === 'darwin') {
    Doombox.createMenuMac(window, keybinds);
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

  // Keybinds
  const toAccelerator = keybind => pascalize(keybind.replace('mod', 'CommandOrControl'), '+');

  globalShortcut.register(
    toAccelerator(keybinds.playPause),
    () => window.webContents.send(IPC.CHANNEL.AUDIO, { action: IPC.ACTION.AUDIO.PAUSE })
  );
  globalShortcut.register(
    toAccelerator(keybinds.nextSong),
    () => window.webContents.send(IPC.CHANNEL.AUDIO, { action: IPC.ACTION.AUDIO.NEXT })
  );
  globalShortcut.register(
    toAccelerator(keybinds.previousSong),
    () => window.webContents.send(IPC.CHANNEL.AUDIO, { action: IPC.ACTION.AUDIO.PREVIOUS })
  );
  globalShortcut.register(
    toAccelerator(keybinds.muteUnmute),
    () => window.webContents.send(IPC.CHANNEL.AUDIO, { action: IPC.ACTION.AUDIO.MUTE })
  );
});

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();

  app.removeAllListeners();
  app.quit();
});
