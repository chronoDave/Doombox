import test from 'tape';
import fs from 'fs';
import path from 'path';

import Logger from '../../../../src/app/lib/logger';

import init from './utils';

test('[logger.error] should create log file', t => {
  const { cleanup } = init();

  const expected = new Error('This is a test');

  Logger.error(expected);

  const files = fs.readdirSync(Logger.root);
  t.equal(files.length, 1, 'creates file');
  const file = fs.readFileSync(path.resolve(Logger.root, files[0]), 'utf-8');
  t.true(file.includes(expected.message), 'has message');
  if (expected.stack) t.true(file.includes(expected.stack), 'has stack');

  cleanup();
  t.end();
});
