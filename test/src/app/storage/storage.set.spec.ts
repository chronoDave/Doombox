import test from 'tape';
import fs from 'fs';

import { cleanup, storage } from './utils';

test('[storage.set] sets data', async t => {
  const x = 100;
  await storage.set('window', { x });

  // @ts-ignore
  t.equal(storage._data.window.x, x, 'sets data');

  cleanup();
  t.end();
});

test('[storage.set] writes data', async t => {
  await storage.set('window', {});

  // @ts-ignore
  t.true(fs.existsSync(storage._file), 'writes data');

  cleanup();
  t.end();
});

test('[storage.set] does not overwrite data', async t => {
  const window = { x: 100, y: 200 };
  // @ts-ignore
  storage._data = { window };
  await storage.set('window', {});

  // @ts-ignore
  t.deepEqual(storage._data.window, window, 'does not overwrite');

  cleanup();
  t.end();
});
