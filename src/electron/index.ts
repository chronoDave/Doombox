import path from 'path';

import { app, BrowserWindow } from 'electron';

const assets = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();

app.on('ready', () => {
  const window = new BrowserWindow();

  window.loadFile(path.resolve(assets, 'client/index.html'));
});

app.on('window-all-closed', () => {
  app.quit();
});
