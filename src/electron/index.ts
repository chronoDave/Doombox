import path from 'path';
import { app } from 'electron';
import { debounce } from 'throttle-debounce';

import createWindow from './window';
import createCache from './storage/cache';
import createTheme from './storage/theme';

const DIR_ROOT = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../userData') :
  app.getPath('userData');
const DIR_ASSETS = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();
const DIR_LOG = path.resolve(DIR_ROOT, 'assets');

const cache = createCache(DIR_ROOT);
const theme = createTheme(DIR_ROOT);

app.on('ready', () => {
  const window = createWindow(
    DIR_ASSETS,
    cache.data.window,
    theme.data.dark
  );

  const handleResize = debounce(100, () => {
    const { width, height } = window.getBounds();

    cache.write('window', { width, height });
  });

  const handleMove = debounce(100, () => {
    const [x, y] = window.getPosition();
    cache.write('window', { x, y });
  });

  window.on('move', handleMove);
  window.on('resize', handleResize);
});

app.on('window-all-closed', () => {
  app.quit();
});
