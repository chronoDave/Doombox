import test from 'tape';
import fs from 'fs';
import path from 'path';

import init from './utils';

test('[logger.error] should create log file', t => {
  const { logger, cleanup } = init();

  const expected = new Error('This is a test');

  logger.error(expected);

  // @ts-ignore
  const files = fs.readdirSync(logger._root);
  t.equal(files.length, 1, 'creates file');
  // @ts-ignore
  const file = fs.readFileSync(path.resolve(logger._root, files[0]), 'utf-8');
  t.true(file.includes(expected.message), 'has message');
  if (expected.stack) t.true(file.includes(expected.stack), 'has stack');

  cleanup();
  t.end();
});
