import fs from 'fs';
import path from 'path';
import test from 'tape';

import fixture from './logger.fixture';

test('[logger.error] should create log file', t => {
  const { logger, root, cleanup } = fixture();

  const expected = new Error('This is a test');

  logger.error(expected);

  const files = fs.readdirSync(root);
  t.equal(files.length, 1, 'creates file');
  const file = fs.readFileSync(path.resolve(root, files[0]), 'utf-8');
  t.true(file.includes(expected.message), 'has message');
  if (expected.stack) t.true(file.includes(expected.stack), 'has stack');

  cleanup();
  t.end();
});

test('[logger.info] should create log file', t => {
  const { logger, root, cleanup } = fixture();

  const expected = 'This is a test';

  logger.info(expected);

  const files = fs.readdirSync(root);
  t.equal(files.length, 1, 'creates file');
  const file = fs.readFileSync(path.resolve(root, files[0]), 'utf-8');
  t.true(file.includes(expected), 'has text');
  t.true(/TIME/.test(file), 'has timestamp');

  cleanup();
  t.end();
});
