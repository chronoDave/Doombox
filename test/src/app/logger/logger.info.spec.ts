import test from 'tape';
import fs from 'fs';
import path from 'path';

import Logger from '../../../../src/app/lib/logger';

import init from './utils';

test('[logger.info] should create log file', t => {
  const { cleanup } = init();
  const expected = 'This is a test';

  Logger.info(expected);

  const files = fs.readdirSync(Logger.root);
  t.equal(files.length, 1, 'creates file');
  const file = fs.readFileSync(path.resolve(Logger.root, files[0]), 'utf-8');
  t.true(file.includes(expected), 'has text');
  t.true(/TIME/.test(file), 'has timestamp');

  cleanup();
  t.end();
});
