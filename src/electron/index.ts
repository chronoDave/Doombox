import fs from 'fs';
import { app } from 'electron';
import { debounce } from 'throttle-debounce';

import cache from './storage/cache.storage';
import theme from './storage/theme.storage';

import { DIR_LOG } from './const';
import createWindow from './window';

app.on('ready', () => {
  fs.mkdirSync(DIR_LOG, { recursive: true });

  const window = createWindow(cache.get('window'), {
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
