import { app as electron } from 'electron';
import fs from 'fs';
import path from 'path';

import { IS_DEV } from '../utils/const';

import run from './lib/app';

const userData = IS_DEV ?
  path.resolve(__dirname, '../data/userData') :
  electron.getPath('userData');
const appData = IS_DEV ?
  path.resolve(__dirname, '../data/appData') :
  electron.getPath('appData');
const assets = IS_DEV ?
  path.resolve(__dirname, '../build/assets') :
  path.resolve(electron.getAppPath(), 'assets');
const logs = IS_DEV ?
  path.resolve(__dirname, '../data/logs') :
  electron.getPath('logs');
const dict = IS_DEV ?
  path.resolve(__dirname, '../node_modules/kuromoji/dict') :
  path.resolve(electron.getAppPath(), 'dict');
const covers = path.resolve(appData, 'covers');

if (IS_DEV) {
  fs.mkdirSync(userData, { recursive: true });
  fs.mkdirSync(appData, { recursive: true });
  fs.mkdirSync(assets, { recursive: true });
  fs.mkdirSync(logs, { recursive: true });
}

fs.mkdirSync(covers, { recursive: true });

run({
  userData,
  appData,
  assets,
  logs,
  dict,
  covers
});
