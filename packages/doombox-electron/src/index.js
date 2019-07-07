const { app } = require('electron');
const mongoose = require('mongoose');

// Core
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');

// Events
const { createListener } = require('./events/createListener');
const { cacheListener } = require('./events/cacheListener');
const { deleteListener } = require('./events/deleteListener');
const { fetchListener } = require('./events/fetchListener');

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    window: {
      width: 800,
      height: 600
    },
    user: {}
  }
});

app.on('ready', () => {
  const { width, height } = store.get('window');

  // Main
  const mainWindow = createWindow({ width, height });
  mainWindow.on('resize', () => {
    store.set('window', { ...mainWindow.getBounds() });
  });

  // Events
  createListener(store);
  cacheListener(store);
  deleteListener();
  fetchListener();

  // Database
  mongoose.connect('mongodb://localhost:32768/doombox', { useNewUrlParser: true })
    .catch(err => { throw err; });
});

app.on('window-all-closed', () => app.quit());
