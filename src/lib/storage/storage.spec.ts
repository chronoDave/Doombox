import fs from 'fs';
import produce from 'immer';
import test from 'tape';

import fixture from './storage.fixture';

test('[storage.read] should read file', t => {
  const { storage, init, cleanup } = fixture();
  init();

  t.true(typeof storage.state === 'object', 'returns file data');

  cleanup();
  t.end();
});

test('[storage.read] should return default shape if file does not exist', t => {
  const { storage, shape } = fixture();

  t.deepEqual(storage.state, shape, 'returns shape');

  t.end();
});

test('[storage.set] sets data', t => {
  const { storage, cleanup } = fixture();

  storage.set(produce(draft => {
    draft.player.muted = true;
  }));

  t.true(storage.state.player.muted, 'sets data');

  cleanup();
  t.end();
});

test('[storage.set] writes data', t => {
  const { storage, file, cleanup } = fixture();

  storage.set(produce(draft => {
    draft.player.muted = true;
  }));

  t.true(fs.existsSync(file), 'writes data');

  cleanup();
  t.end();
});
