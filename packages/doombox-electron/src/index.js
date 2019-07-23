const { app } = require('electron');
const mongoose = require('mongoose');

// Core
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');

// Events
const { userListener } = require('./events/userListener');
const { imageListener } = require('./events/imageListener');

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

  // Main
  const mainWindow = createWindow({ width, height });
  mainWindow.on('resize', () => {
    store.set('window', { ...mainWindow.getBounds() });
  });

  // Database
  mongoose.connect('mongodb://localhost:32769/doombox', { useNewUrlParser: true })
    .then(() => {
      // Events
      userListener(store);
      imageListener();
    })
    .catch(err => { throw err; });
});

app.on('window-all-closed', () => app.quit());
