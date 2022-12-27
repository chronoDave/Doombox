import type { Image, Song } from '../types/library';

import fs from 'fs';
import path from 'path';
import { app as electron } from 'electron';
import LeafDB from 'leaf-db';

import appShape from '../types/shapes/app.shape';
import themeShape from '../types/shapes/theme.shape';
import { IS_DEV } from '../utils/const';
import userShape from '../types/shapes/user.shape';

import run from './lib/app';
import Logger from './lib/logger';
import Storage from './lib/storage';
import createThemeController from './lib/controllers/theme.controller';
import createUserController from './lib/controllers/user.controller';
import createLibraryController from './lib/controllers/library.controller';
import createAppController from './lib/controllers/app.controller';
import createIpcRouter from './lib/utils/createIpcRouter';

const ROOT = {
  USER_DATA: IS_DEV ?
    path.resolve(__dirname, '../data/userData') :
    electron.getPath('userData'),
  ASSETS: IS_DEV ?
    path.resolve(__dirname, '../build/assets') :
    path.resolve(electron.getAppPath(), 'assets'),
  LOGS: IS_DEV ?
    path.resolve(__dirname, '../data/logs') :
    electron.getPath('logs'),
  APP_DATA: IS_DEV ?
    path.resolve(__dirname, '../data/appData') :
    electron.getPath('appData')
} as const;

const DIR = {
  COVERS: path.resolve(ROOT.APP_DATA, 'covers'),
  THUMBS: path.resolve(ROOT.APP_DATA, 'thumbs')
} as const;

if (IS_DEV) {
  Object.values(ROOT)
    .forEach(dir => fs.mkdirSync(dir, { recursive: true }));
}

Object.values(DIR)
  .forEach(dir => fs.mkdirSync(dir, { recursive: true }));

const logger = new Logger({ root: ROOT.LOGS });
const db = {
  songs: new LeafDB<Song>({ storage: { root: ROOT.APP_DATA, name: 'songs' } }),
  images: new LeafDB<Image>({ storage: { root: ROOT.APP_DATA, name: 'images' } })
};
const storage = {
  app: new Storage({ name: 'app', shape: appShape, root: ROOT.APP_DATA }),
  theme: new Storage({ name: 'theme', shape: themeShape, root: ROOT.USER_DATA }),
  user: new Storage({ name: 'user', shape: userShape, root: ROOT.USER_DATA })
};
const router = {
  library: createIpcRouter(createLibraryController({
    db,
    storage,
    root: {
      covers: DIR.COVERS,
      thumbs: DIR.THUMBS
    }
  }))(logger),
  user: createIpcRouter(createUserController({
    storage: storage.user
  }))(logger),
  theme: createIpcRouter(createThemeController({
    storage: storage.theme
  }))(logger),
  app: createIpcRouter(createAppController())(logger)
};

Object.values(db).forEach(x => x.open());

run({
  router,
  logger,
  storage,
  db
});
