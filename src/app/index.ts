import { app as electron } from 'electron';
import fs from 'fs';
import path from 'path';

import App from './lib/app';
import Logger from './lib/logger';
import { isDev } from './lib/utils';

const dir = {
  userData: isDev() ?
    path.resolve(__dirname, '../userData') :
    electron.getPath('userData'),
  assets: isDev() ?
    path.resolve(__dirname, '../build/assets') :
    path.resolve(electron.getAppPath(), 'assets')
} as const;

if (isDev()) {
  fs.mkdirSync(dir.assets, { recursive: true });
  fs.mkdirSync(dir.userData, { recursive: true });
  fs.mkdirSync(Logger.root, { recursive: true });
}

const app = new App({ dir });
app.run();
