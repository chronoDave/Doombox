import type { Image, Song } from '../types/library';

import fs from 'fs';
import path from 'path';
import { app as electron } from 'electron';
import LeafDB from 'leaf-db';

import appShape from '../types/shapes/app.shape';
import themeShape from '../types/shapes/theme.shape';

import run from './lib/app';
import Logger from './lib/logger';
import Storage from './lib/storage';

const isDev = process.env.NODE_ENV === 'development';

const ROOT = {
  USER_DATA: isDev ?
    path.resolve(__dirname, '../userData') :
    electron.getPath('userData'),
  ASSETS: isDev ?
    path.resolve(__dirname, '../build/assets') :
    path.resolve(electron.getAppPath(), 'assets'),
  LOGGER: isDev ?
    path.resolve(__dirname, '../userData/logs') :
    electron.getPath('logs')
} as const;

if (isDev) {
  Object.values(ROOT)
    .forEach(dir => fs.mkdirSync(dir, { recursive: true }));
}

const logger = new Logger({ root: ROOT.LOGGER });
const db = {
  songs: new LeafDB<Song>({ storage: { root: ROOT.USER_DATA, name: 'songs' } }),
  images: new LeafDB<Image>({ storage: { root: ROOT.USER_DATA, name: 'images' } })
};
const storage = {
  app: new Storage({ name: 'app', shape: appShape, root: ROOT.USER_DATA }),
  theme: new Storage({ name: 'theme', shape: themeShape, root: ROOT.USER_DATA })
};

Object.values(db).forEach(x => x.open());

run({ logger, storage, db });
