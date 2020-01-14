const { app, ipcMain } = require('electron');
const { TYPE } = require('@doombox/utils');

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
const {
  COLLECTION,
  CACHE
} = require('./utils/const');
const {
  createKeyboardListener,
  createWindow
} = require('./utils/electron');

// eslint-disable-next-line import/no-dynamic-require
const { CONFIG } = require(
  process.env.NODE_ENV === 'development' ?
    './config.dev' :
    './config'
);

const configUser = new Storage(PATH.CONFIG, 'user-config', CONFIG.USER);
const configSystem = new Storage(PATH.CONFIG, 'system-config', CONFIG.SYSTEM);
const cache = new Storage(PATH.CONFIG, 'cache', CONFIG.CACHE);

if (!configUser.get(TYPE.CONFIG.GENERAL).hardwareAcceleration) {
  app.disableHardwareAcceleration();
}

const db = new NeDB(Object.values(COLLECTION), PATH.DATABASE);
const logger = new Logger(PATH.LOG);
const router = new Router(logger);

const parserOptions = configSystem.get(TYPE.CONFIG.PARSER);
const parser = new MetadataParser(db, {
  ...parserOptions,
  pathImage: parserOptions.pathImage || PATH.IMAGE
});

app.on('ready', () => {
  // General
  router.createRouter(
    TYPE.IPC.LIBRARY,
    new LibraryController(db, parser, logger)
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
    new RpcController(logger, configUser.get(TYPE.CONFIG.DISCORD))
  );
  // Storage
  router.createRouter(TYPE.IPC.CONFIG.USER, new StorageController(
    configUser, TYPE.IPC.CONFIG.USER
  ));
  router.createRouter(TYPE.IPC.CONFIG.SYSTEM, new StorageController(
    configSystem, TYPE.IPC.CONFIG.SYSTEM
  ));
  router.createRouter(TYPE.IPC.CACHE, new StorageController(
    cache, TYPE.IPC.CACHE
  ));

  let mainWindow = createWindow(cache.get(CACHE.DIMENSIONS));

  createKeyboardListener(
    configUser.get(TYPE.CONFIG.KEYBIND),
    ({ action }) => mainWindow.webContents.send(TYPE.IPC.KEYBIND, action)
  );

  mainWindow.on('resize', () => {
    cache.set(CACHE.DIMENSIONS, { ...mainWindow.getBounds() });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Prevent multi-instance
if (!app.requestSingleInstanceLock()) {
  const { forceQuit } = configUser.get(TYPE.CONFIG.GENERAL);

  if (!process.platform === 'darwin' || forceQuit) {
    app.quit();
  }
}

app.on('window-all-closed', () => {
  ipcMain.removeAllListeners();
  app.quit();
});
