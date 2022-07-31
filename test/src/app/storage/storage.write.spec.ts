import test from 'tape';
import fs from 'fs';

import type { Shape } from '../../../../src/types/primitives';

import init from './utils';

test('[storage.write] should write file', async t => {
  const data: Shape = { a: 1 };
  const { write, cleanup, storage } = init();
  write();

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
  const { cleanup, storage } = init();
  // @ts-ignore
  await storage._write();

  // @ts-ignore
  t.true(fs.existsSync(storage._file));

  cleanup();
  t.end();
});
