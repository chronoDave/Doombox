const { BrowserWindow } = require('electron');
const path = require('path');
const { isDev } = require('@doombox/utils');

module.exports = {
  createWindow: (args = {}) => {
    let window = new BrowserWindow({
      width: args.width || 800,
      height: args.height || 600,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      },
      backgroundColor: '#36393f',
      show: false
    });

    window.loadURL(
      isDev() ?
        'http://localhost:5000' :
        `file://${path.normalize(`${__dirname}../../../../client/index.html`)}`
    );

    window.on('closed', () => {
      window = null;
    });

    return window;
  }
};
