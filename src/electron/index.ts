import path from 'path';

import { app } from 'electron';

import createWindow from './window';

const DIR_ROOT = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../userData') :
  app.getPath('userData');
const DIR_ASSETS = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();
const DIR_LOG = path.resolve(DIR_ROOT, 'assets');

app.on('ready', () => {
  const window = createWindow(DIR_ASSETS);
});

app.on('window-all-closed', () => {
  app.quit();
});
