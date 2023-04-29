import fs from 'fs';
import produce from 'immer';
import test from 'tape';

import fixture from './fixture';

test('[storage.set] sets data', t => {
  const { storage, cleanup } = fixture();

  const x = 100;
  storage.set(produce(draft => {
    draft.window.x = x;
  })({ window: {} }));

  // @ts-expect-error: Ignore private
  t.equal(storage._data.window.x, x, 'sets data');

  cleanup();
  t.end();
});

test('[storage.set] writes data', t => {
  const { storage, cleanup } = fixture();
  storage.set(produce(draft => draft)({}));

  // @ts-expect-error: Ignore private
  t.true(fs.existsSync(storage._file), 'writes data');

  cleanup();
  t.end();
});
