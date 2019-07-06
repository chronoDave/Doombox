const { app, BrowserWindow } = require('electron');
const path = require('path');

module.exports = {
  createWindow: args => {
    let window = new BrowserWindow({
      width: args.width,
      height: args.height,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false
      }
    });

    switch (process.env.NODE_ENV) {
      case 'development':
        window.loadURL('http://localhost:5000');
        break;
      default:
        window.loadFile(path.normalize(`${app.getAppPath()}/../client/index.html`));
        break;
    }

    window.on('closed', () => {
      window = null;
    });

    return window;
  }
};
