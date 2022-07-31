import test from 'tape';
import fs from 'fs';
import path from 'path';

import init from './utils';

test('[logger.info] should create log file', t => {
  const { logger, cleanup } = init();
  const expected = 'This is a test';

  logger.info(expected);

  // @ts-ignore
  const files = fs.readdirSync(logger._root);
  t.equal(files.length, 1, 'creates file');
  // @ts-ignore
  const file = fs.readFileSync(path.resolve(logger._root, files[0]), 'utf-8');
  t.true(file.includes(expected), 'has text');
  t.true(/TIME/.test(file), 'has timestamp');

  cleanup();
  t.end();
});
