const { app } = require('electron');
const makeDir = require('make-dir');
const { TYPE } = require('@doombox/utils');

// Lib
const { createWindow } = require('./lib/window');
const { createKeyboardListener } = require('./utils');
const { createRouter } = require('./lib/router');
const NeDB = require('./lib/database/nedb');

// Controllers
const ConfigController = require('./controller/configController');
const LibraryController = require('./controller/libraryController');
const PlaylistController = require('./controller/playlistController');

// Utils
const { PATH } = require('./utils/const');
const {
  userConfig,
  appConfig
} = require('./utils/config');

makeDir.sync(PATH.LOG);
makeDir.sync(PATH.IMAGE);

const db = new NeDB();

app.on('ready', () => {
  const parserOptions = appConfig.get('parser');

  createRouter(TYPE.IPC.CONFIG, new ConfigController(userConfig, TYPE.IPC.CONFIG));
  createRouter(TYPE.IPC.SYSTEM, new ConfigController(appConfig, TYPE.IPC.SYSTEM));
  createRouter(TYPE.IPC.LIBRARY, new LibraryController(db, parserOptions));
  createRouter(TYPE.IPC.PLAYLIST, new PlaylistController(db));

  const { width, height } = appConfig.get('dimension');

  let mainWindow = createWindow({ width, height });

  createKeyboardListener(
    userConfig.get('keybinds'),
    ({ action }) => mainWindow.webContents.send(TYPE.IPC.KEYBIND, action)
  );

  mainWindow.on('resize', () => {
    appConfig.set('dimension', { ...mainWindow.getBounds() });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Prevent multi-instance
if (!app.requestSingleInstanceLock()) {
  const { forceQuit } = userConfig.get('general');

  if (!process.platform === 'darwin' || forceQuit) {
    app.quit();
  }
}

app.on('window-all-closed', () => {
  app.quit();
});
