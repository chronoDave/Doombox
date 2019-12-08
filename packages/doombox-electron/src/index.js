const { app } = require('electron');
const makeDir = require('make-dir');
const { TYPE } = require('@doombox/utils');

// Lib
const { createWindow } = require('./lib/window');
const { createKeyboardListener } = require('./utils');
const NeDB = require('./lib/database/nedb');

// Routers
const { useConfigRouter } = require('./router/configRouter');
const { useLibraryRouter } = require('./router/libraryRouter');
const { useSystemRouter } = require('./router/systemRouter');

// Controllers
const ConfigController = require('./controller/configController');
const LibraryController = require('./controller/libraryController');

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

  useConfigRouter(new ConfigController(userConfig, TYPE.IPC.CONFIG));
  useSystemRouter(new ConfigController(appConfig, TYPE.IPC.SYSTEM));
  useLibraryRouter(new LibraryController(db, parserOptions));

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
