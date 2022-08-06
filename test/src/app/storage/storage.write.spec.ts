import type { Shape } from '../../../../src/types/primitives';

import test from 'tape';
import fs from 'fs';

import fixture from './fixture';

test('[storage.write] should write file', async t => {
  const data: Shape = { a: 1 };
  const { init, cleanup, storage } = fixture();
  init();

  // @ts-ignore
  storage._data = data;
  // @ts-ignore
  await storage._write();

  t.deepEqual(
    // @ts-ignore
    JSON.parse(fs.readFileSync(storage._file, 'utf-8')),
    data,
    'writes file'
  );

  cleanup();
  t.end();
});

test('[storage.write] should create file if file does not exist', async t => {
  const { cleanup, storage } = fixture();
  // @ts-ignore
  await storage._write();

  // @ts-ignore
  t.true(fs.existsSync(storage._file));

  cleanup();
  t.end();
});
