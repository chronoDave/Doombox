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
import createThemeController from './lib/controllers/theme.controller';
import createLibraryController from './lib/controllers/library/library.controller';
import { createIpcRouter } from './lib/utils/ipc';

const isDev = process.env.NODE_ENV === 'development';

const ROOT = {
  USER_DATA: isDev ?
    path.resolve(__dirname, '../data/userData') :
    electron.getPath('userData'),
  ASSETS: isDev ?
    path.resolve(__dirname, '../build/assets') :
    path.resolve(electron.getAppPath(), 'assets'),
  LOGS: isDev ?
    path.resolve(__dirname, '../data/logs') :
    electron.getPath('logs'),
  APP_DATA: isDev ?
    path.resolve(__dirname, '../data/appData') :
    electron.getPath('appData')
} as const;

const DIR = {
  COVERS: path.resolve(ROOT.APP_DATA, 'covers'),
  THUMBS: path.resolve(ROOT.APP_DATA, 'thumbs')
} as const;

if (isDev) {
  Object.values(ROOT)
    .forEach(dir => fs.mkdirSync(dir, { recursive: true }));
}

const logger = new Logger({ root: ROOT.LOGS });
const db = {
  songs: new LeafDB<Song>({ storage: { root: ROOT.APP_DATA, name: 'songs' } }),
  images: new LeafDB<Image>({ storage: { root: ROOT.APP_DATA, name: 'images' } })
};
const storage = {
  app: new Storage({ name: 'app', shape: appShape, root: ROOT.USER_DATA }),
  theme: new Storage({ name: 'theme', shape: themeShape, root: ROOT.USER_DATA })
};
const router = {
  library: createIpcRouter(createLibraryController({
    db,
    root: {
      covers: DIR.COVERS,
      thumbs: DIR.THUMBS
    }
  }))(logger),
  theme: createIpcRouter(createThemeController({
    storage: storage.theme
  }))(logger)
};

Object.values(db).forEach(x => x.open());

run({
  router,
  logger,
  storage,
  db
});
