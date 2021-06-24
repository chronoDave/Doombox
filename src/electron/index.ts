import path from 'path';
import { app } from 'electron';
import { debounce } from 'throttle-debounce';

import createWindow from './window';
import createCache from './storage/cache.storage';
import createTheme from './storage/theme.storage';

const DIR_ROOT = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../userData') :
  app.getPath('userData');
const DIR_ASSETS = process.env.NODE_ENV === 'development' ?
  path.resolve(__dirname, '../../build') :
  app.getAppPath();
// const DIR_LOG = path.resolve(DIR_ROOT, 'assets');

const cache = createCache(DIR_ROOT);
const theme = createTheme(DIR_ROOT);

app.on('ready', () => {
  const window = createWindow(DIR_ASSETS, cache.get('window'), {
    darkTheme: theme.get('dark'),
    backgroundColor: theme.get('palette').grey[200]
  });

  const handleResize = debounce(100, () => {
    const { width, height } = window.getBounds();

    cache.set('window', { width, height });
  });

  const handleMove = debounce(100, () => {
    const [x, y] = window.getPosition();
    cache.set('window', { x, y });
  });

  window.on('move', handleMove);
  window.on('resize', handleResize);
});

app.on('window-all-closed', () => {
  app.quit();
});
