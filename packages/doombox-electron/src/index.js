const { app, ipcMain } = require('electron');
const makeDir = require('make-dir');
const { TYPE, STORAGE } = require('@doombox/utils');

// Lib
const { createWindow } = require('./lib/window');
const { createKeyboardListener } = require('./utils');
const { createRouter } = require('./lib/router');
const NeDB = require('./lib/database/nedb');

// Controllers
const StorageController = require('./controller/storageController');
const LibraryController = require('./controller/libraryController');
const PlaylistController = require('./controller/playlistController');
const ImageController = require('./controller/imageController');

// Utils
const { PATH } = require('./utils/const');
const {
  userConfig,
  systemConfig,
  systemCache
} = require('./utils/config');

makeDir.sync(PATH.LOG);
makeDir.sync(PATH.IMAGE);

const db = new NeDB();

app.on('ready', () => {
  createRouter(
    TYPE.IPC.CONFIG.USER,
    new StorageController(userConfig, TYPE.IPC.CONFIG.USER)
  );
  createRouter(
    TYPE.IPC.CONFIG.SYSTEM,
    new StorageController(systemConfig, TYPE.IPC.CONFIG.SYSTEM)
  );
  createRouter(
    TYPE.IPC.CACHE,
    new StorageController(systemCache, TYPE.IPC.CACHE)
  );

  createRouter(TYPE.IPC.LIBRARY, new LibraryController(db, systemConfig.get(STORAGE.PARSER)));
  createRouter(TYPE.IPC.PLAYLIST, new PlaylistController(db));
  createRouter(TYPE.IPC.IMAGE, new ImageController(db));

  let mainWindow = createWindow(systemCache.get(STORAGE.DIMENSION));

  createKeyboardListener(
    userConfig.get(STORAGE.KEYBIND),
    ({ action }) => mainWindow.webContents.send(TYPE.IPC.KEYBIND, action)
  );

  mainWindow.on('resize', () => {
    systemCache.set(STORAGE.DIMENSION, { ...mainWindow.getBounds() });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Prevent multi-instance
if (!app.requestSingleInstanceLock()) {
  const { forceQuit } = userConfig.get(STORAGE.GENERAL);

  if (!process.platform === 'darwin' || forceQuit) {
    app.quit();
  }
}

app.on('window-all-closed', () => {
  ipcMain.removeAllListeners();
  app.quit();
});
