import fs from 'fs';
import test from 'tape';

import fixture from './fixture';

test('[storage.set] sets data', async t => {
  const { storage, cleanup } = fixture();

  const x = 100;
  storage.set('window', { x });

  // @ts-expect-error: Ignore private
  t.equal(storage._data.window.x, x, 'sets data');

  cleanup();
  t.end();
});

test('[storage.set] writes data', async t => {
  const { storage, cleanup } = fixture();

  storage.set('window', {});

  // @ts-expect-error: Ignore private
  t.true(fs.existsSync(storage._file), 'writes data');

  cleanup();
  t.end();
});

test('[storage.set] does not overwrite data', async t => {
  const { storage, cleanup } = fixture();

  const window = { x: 100, y: 200 };
  // @ts-expect-error: Ignore private
  storage._data = { window };
  storage.set('window', {});

  // @ts-expect-error: Ignore private
  t.deepEqual(storage._data.window, window, 'does not overwrite');

  cleanup();
  t.end();
});
