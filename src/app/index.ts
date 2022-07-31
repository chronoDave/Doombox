import { app as electron } from 'electron';
import path from 'path';
import fs from 'fs';

import App from './lib/app';

const isDev = process.env.NODE_ENV === 'development';
const userData = isDev ?
  path.resolve(__dirname, '../userData') :
  electron.getPath('userData');
const assets = isDev ?
  path.resolve(__dirname, '../build/assets') :
  path.resolve(electron.getAppPath(), 'assets');

fs.mkdirSync(userData, { recursive: true });
fs.mkdirSync(assets, { recursive: true });

const app = new App({ isDev, path: { userData, assets } });
app.run();
