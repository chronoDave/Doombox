const { app } = require('electron');
const mongoose = require('mongoose');

// Core
const { createWindow } = require('./lib/window');
const Store = require('./lib/store');
const { ipcListener } = require('./events/ipcListener');

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    window: {
      width: 800,
      height: 600
    },
    user: {
      username: 'User',
      avatar: null
    }
  }
});

app.on('ready', () => {
  const { width, height } = store.get('window');

  const mainWindow = createWindow({ width, height });
  mainWindow.on('resize', () => {
    store.set('window', { ...mainWindow.getBounds() });
  });

  mongoose.connect('mongodb://localhost:32768/doombox', { useNewUrlParser: true })
    .then(() => {
      ipcListener(store);
    })
    .catch(err => { throw err; });
});

app.on('window-all-closed', () => app.quit());
