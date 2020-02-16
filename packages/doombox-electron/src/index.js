const {
  app,
  ipcMain,
  globalShortcut
} = require('electron');
const {
  CONFIG,
  CACHE,
  TYPE
} = require('@doombox/utils');
const debounce = require('lodash.debounce');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

// Lib
const { NeDB } = require('./lib/database');
const MetadataParser = require('./lib/parser');
const {
  StorageController,
  LibraryController,
  PlaylistController,
  ImageController,
  RpcController
} = require('./lib/controller');
const Logger = require('./lib/log');
const Router = require('./lib/router');
const Storage = require('./lib/storage');

// Utils
const { PATH } = require('./utils/path');
const { COLLECTION } = require('./utils/const');
const {
  createKeyboardListener,
  createWindow
} = require('./utils/electron');

const config = new Storage(PATH.CONFIG, 'config', CONFIG);
const cache = new Storage(PATH.CONFIG, 'cache', CACHE);

if (!config.get(TYPE.CONFIG.GENERAL).hardwareAcceleration) {
  app.disableHardwareAcceleration();
}

const db = new NeDB(Object.values(COLLECTION), PATH.DATABASE);
const logger = new Logger(PATH.LOG);
const router = new Router(logger);

const parserOptions = config.get(TYPE.CONFIG.PARSER);
const parser = new MetadataParser(parserOptions);

app.on('ready', () => {
  if (process.env.NODE_ENV === 'development') {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(console.error);
  }

  // General
  router.createRouter(
    TYPE.IPC.LIBRARY,
    new LibraryController(db, parser, logger, config.imagePath || PATH.IMAGE)
  );
  router.createRouter(
    TYPE.IPC.PLAYLIST,
    new PlaylistController(db)
  );
  router.createRouter(
    TYPE.IPC.IMAGE,
    new ImageController(db)
  );
  router.createRouter(
    TYPE.IPC.RPC,
    new RpcController(logger, config.get(TYPE.CONFIG.DISCORD))
  );
  // Storage
  router.createRouter(TYPE.IPC.CONFIG, new StorageController(
    config, TYPE.IPC.CONFIG
  ));
  router.createRouter(TYPE.IPC.CACHE, new StorageController(
    cache, TYPE.IPC.CACHE
  ));

  let mainWindow = createWindow({
    ...cache.get(TYPE.CONFIG.DIMENSIONS),
    ...cache.get(TYPE.CONFIG.POSITION)
  });
  createKeyboardListener(
    config.get(TYPE.CONFIG.KEYBIND),
    payload => mainWindow.webContents.send(TYPE.IPC.KEYBIND, payload)
  );

  mainWindow.on('resize', () => cache.set(TYPE.CONFIG.DIMENSIONS, { ...mainWindow.getBounds() }));
  const handleMove = debounce(() => {
    const position = mainWindow.getPosition();
    cache.set(TYPE.CONFIG.POSITION, {
      x: position[0],
      y: position[1]
    });
  }, 100);
  mainWindow.on('move', handleMove);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Prevent multi-instance
if (!app.requestSingleInstanceLock()) {
  const { forceQuit } = config.get(TYPE.CONFIG.GENERAL);

  if (!process.platform === 'darwin' || forceQuit) {
    app.quit();
  }
}

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  ipcMain.removeAllListeners();
});

app.on('window-all-closed', () => {
  app.quit();
});
