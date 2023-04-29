import test from 'tape';

import fixture from './fixture';

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
