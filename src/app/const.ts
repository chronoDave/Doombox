import { app } from 'electron';
import path from 'path';

import { IS_DEV } from '../utils/const';

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

export const PATH = {
  USER_DATA,
  APP_DATA,
  ASSETS,
  LOGS,
  THUMBS: path.resolve(APP_DATA, 'thumbs')
};
