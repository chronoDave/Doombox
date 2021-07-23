import path from 'path';
import { BrowserWindow } from 'electron';
import { Cache } from '@doombox/config';
import { Theme } from '@doombox/theme';

import { DIR_ASSETS } from './const';

export default (cache: Cache['window'], theme: {
  darkTheme: boolean,
  backgroundColor: Theme['palette']['grey']['200']
}) => {
  const window = new BrowserWindow({
    ...cache,
    ...theme,
    title: 'Doombox',
    icon: process.platform === 'win32' ?
      path.resolve(DIR_ASSETS, 'icons/app.ico') :
      path.resolve(DIR_ASSETS, 'icons/app.png'),
    minWidth: 320,
    minHeight: 240,
    frame: process.platform === 'darwin',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  window.loadFile(path.resolve(DIR_ASSETS, 'client/index.html'));

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    require('chokidar')
      .watch(`${DIR_ASSETS}/client/**/*`)
      .on('change', () => window.reload());
  }

  return window;
};
