import { app } from 'electron';
import path from 'path';

import { IS_DEV } from '../utils/const';

const USER_DATA = IS_DEV() ?
  path.resolve(__dirname, '../../data/userData') :
  app.getPath('userData');
const APP_DATA = IS_DEV() ?
  path.resolve(__dirname, '../../data/appData') :
  app.getPath('appData');
const ASSETS = IS_DEV() ?
  path.resolve(__dirname, './assets') :
  path.resolve(app.getAppPath(), 'assets');
const LOGS = IS_DEV() ?
  path.resolve(__dirname, '../../data/logs') :
  app.getPath('logs');

const COVERS = path.resolve(APP_DATA, 'covers');
const THUMBS = path.resolve(APP_DATA, 'thumbs');

export const PATH = {
  USER_DATA,
  APP_DATA,
  ASSETS,
  LOGS,
  COVERS,
  THUMBS
};
