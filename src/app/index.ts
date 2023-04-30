import { app as electron } from 'electron';
import fs from 'fs';
import path from 'path';

import { IS_DEV } from '../utils/const';

import app from './lib/app';

const userData = IS_DEV ?
  path.resolve(__dirname, '../../data/userData') :
  electron.getPath('userData');
const appData = IS_DEV ?
  path.resolve(__dirname, '../../data/appData') :
  electron.getPath('appData');
const assets = IS_DEV ?
  path.resolve(__dirname, './assets') :
  path.resolve(electron.getAppPath(), 'assets');
const logs = IS_DEV ?
  path.resolve(__dirname, '../../data/logs') :
  electron.getPath('logs');
const dict = IS_DEV ?
  path.resolve(__dirname, '../../node_modules/kuromoji/dict') :
  path.resolve(electron.getAppPath(), 'dict');
const thumb = path.resolve(appData, 'covers/thumb');
const original = path.resolve(appData, 'covers/original');

if (IS_DEV) {
  fs.mkdirSync(userData, { recursive: true });
  fs.mkdirSync(appData, { recursive: true });
  fs.mkdirSync(assets, { recursive: true });
  fs.mkdirSync(logs, { recursive: true });
}

fs.mkdirSync(thumb, { recursive: true });
fs.mkdirSync(original, { recursive: true });

app({
  userData,
  appData,
  assets,
  logs,
  dict,
  covers: {
    thumb,
    original
  }
});
