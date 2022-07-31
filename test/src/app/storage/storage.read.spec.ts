import test from 'tape';

import { init, cleanup, storage } from './utils';

test('[storage.read] should read file', t => {
  init();

  // @ts-ignore
  const json = storage._read();
  t.true(typeof json === 'object', 'returns file');

  cleanup();
  t.end();
});

test('[storage.read] should return null if file does not exist', t => {
  // @ts-ignore
  const json = storage._read();

  t.equal(json, null, 'returns null');

  t.end();
});
