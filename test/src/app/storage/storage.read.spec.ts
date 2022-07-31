import test from 'tape';

import init from './utils';

test('[storage.read] should read file', t => {
  const { storage, write, cleanup } = init();
  write();

  // @ts-ignore
  const json = storage._read();
  t.true(typeof json === 'object', 'returns file');

  cleanup();
  t.end();
});

test('[storage.read] should return null if file does not exist', t => {
  const { storage } = init();
  // @ts-ignore
  const json = storage._read();

  t.equal(json, null, 'returns null');

  t.end();
});
