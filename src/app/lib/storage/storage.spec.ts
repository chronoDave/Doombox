import fs from 'fs';
import produce from 'immer';
import test from 'tape';

import fixture from './storage.fixture';

test('[storage.read] should read file', t => {
  const { storage, init, cleanup } = fixture();
  init();

  // @ts-expect-error: Ignore private
  const json = storage._read();
  t.true(typeof json === 'object', 'returns file');

  cleanup();
  t.end();
});

test('[storage.read] should return null if file does not exist', t => {
  const { storage } = fixture();
  // @ts-expect-error: Ignore private
  const json = storage._read();

  t.equal(json, null, 'returns null');

  t.end();
});

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
