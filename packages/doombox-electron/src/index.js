const { app } = require('electron');

// Core
const { createWindow } = require('./lib/window');

app.on('ready', createWindow);

app.on('window-all-closed', () => app.quit());
