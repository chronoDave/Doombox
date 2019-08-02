const { app } = require('electron');

// Core
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');

// Routes
const { systemRouter, systemCleanup } = require('./modules/system');
const { userRouter, userCleanup } = require('./modules/user');

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    window: {
      width: 800,
      height: 600
    },
    connection: null,
    user: {}
  }
});

app.on('ready', () => {
  const { width, height } = store.get('window');

  // Routes
  systemRouter(store);
  userRouter(store);

  // Main
  const mainWindow = createWindow({ width, height });
  mainWindow.on('resize', () => {
    store.set('window', { ...mainWindow.getBounds() });
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
});

app.on('window-all-closed', () => {
  systemCleanup();
  userCleanup();
  app.quit();
});
