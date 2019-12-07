const { app } = require('electron');
const mkdirp = require('mkdirp');
const { TYPES } = require('@doombox/utils');

// Lib
const { createWindow } = require('./lib/window');
const { createKeyboardListener } = require('./utils');
const NeDB = require('./lib/database/nedb');

// Routers
const { useConfigRouter } = require('./router/configRouter');

// Controllers
const ConfigController = require('./controller/configController');

// Utils
const { PATH } = require('./utils/const');
const {
  userConfig,
  appConfig
} = require('./utils/config');

mkdirp.sync(PATH.LOG);

// const db = new NeDB();

app.on('ready', () => {
  useConfigRouter(new ConfigController({ config: userConfig }));

  const { width, height } = appConfig.get('dimension');

  let mainWindow = createWindow({ width, height });

  createKeyboardListener(
    userConfig.get('keybinds'),
    ({ action }) => mainWindow.webContents.send(TYPES.IPC.KEYBIND, action)
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
