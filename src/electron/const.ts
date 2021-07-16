import path from 'path';
import { app } from 'electron';

export const DIR_ROOT = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../userData') :
  app.getPath('userData');
export const DIR_ASSETS = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();

export const DIR_LOG = path.resolve(DIR_ROOT, 'log');
