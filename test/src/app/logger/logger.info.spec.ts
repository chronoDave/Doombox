import test from 'tape';
import fs from 'fs';
import path from 'path';

import Logger from '../../../../src/app/lib/logger';

import init from './utils';

test('[logger.info] should create log file', t => {
  const { cleanup } = init();
  const expected = 'This is a test';

  Logger.info(expected);

  // @ts-ignore
  const files = fs.readdirSync(Logger._root);
  t.equal(files.length, 1, 'creates file');
  // @ts-ignore
  const file = fs.readFileSync(path.resolve(Logger._root, files[0]), 'utf-8');
  t.true(file.includes(expected), 'has text');
  t.true(/TIME/.test(file), 'has timestamp');

  cleanup();
  t.end();
});
