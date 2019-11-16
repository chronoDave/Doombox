const { app } = require('electron');

// Lib
const { createWindow } = require('./lib/window');

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
