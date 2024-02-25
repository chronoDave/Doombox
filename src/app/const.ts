import { app } from 'electron';
import path from 'path';

import { IS_DEV } from '../lib/const';

const USER_DATA = IS_DEV ?
  path.resolve(__dirname, '../../data/userData') :
  app.getPath('userData');
const APP_DATA = IS_DEV ?
  path.resolve(__dirname, '../../data/appData') :
  USER_DATA;
const ASSETS = IS_DEV ?
  path.resolve(__dirname, './assets') :
  path.resolve(app.getAppPath(), 'assets');
const LOGS = IS_DEV ?
  path.resolve(__dirname, '../../data/logs') :
  path.resolve(app.getPath('logs'), app.getName());
const DICT = IS_DEV ?
  path.resolve(__dirname, '../../node_modules/kuromoji/dict') :
  path.resolve(app.getAppPath(), 'assets/dict');

export const PATH = {
  USER_DATA,
  APP_DATA,
  ASSETS,
  LOGS,
  DICT,
  THUMBS: path.resolve(APP_DATA, 'thumbs')
} as const;
