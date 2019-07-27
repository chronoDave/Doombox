const { app } = require('electron');

// Core
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');

// Events
const { userListener, userCleanup } = require('./events/userListener');
const { imageListener, imageCleanup } = require('./events/imageListener');
const { systemListener } = require('./events/systemListener');

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    window: {
      width: 800,
      height: 600
    },
    user: null
  }
});

app.on('ready', () => {
  const { width, height } = store.get('window');

  // Events
  userListener(store);
  imageListener();
  systemListener(store);

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
  userCleanup();
  imageCleanup();
  app.quit();
});
