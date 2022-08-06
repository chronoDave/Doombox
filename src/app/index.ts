import fs from 'fs';
import path from 'path';
import { app as electron } from 'electron';

import App from './lib/app';
import Logger from './lib/logger';
import AppStorage from './lib/storage/app.storage';
import ThemeStorage from './lib/storage/theme.storage';

const isDev = () => process.env.NODE_ENV === 'development';

const ROOT = {
  USER_DATA: isDev() ?
    path.resolve(__dirname, '../userData') :
    electron.getPath('userData'),
  ASSETS: isDev() ?
    path.resolve(__dirname, '../build/assets') :
    path.resolve(electron.getAppPath(), 'assets'),
  LOGGER: isDev() ?
    path.resolve(__dirname, '../userData/logs') :
    electron.getPath('logs')
} as const;

if (isDev()) {
  Object.values(ROOT)
    .forEach(dir => fs.mkdirSync(dir, { recursive: true }));
}

const logger = new Logger({ root: ROOT.LOGGER });
const storage = {
  app: new AppStorage({ root: ROOT.USER_DATA }),
  theme: new ThemeStorage({ root: ROOT.USER_DATA })
};

const app = new App({ logger, storage });
app.run();
