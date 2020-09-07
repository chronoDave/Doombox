const test = require('ava');
const path = require('path');

const fse = require('fs-extra');

const Reporter = require('./reporter');

const root = path.resolve(__dirname, 'test');

test.serial('should create log file', t => {
  const text = 'This is a test';

  const reporter = new Reporter(root);

  fse.mkdirpSync(root);

  reporter.log(text, 'tape', 'TEST');

  const files = fse.readdirSync(root);

  t.is(files.length, 1, 'creates file');
  t.true(files[0].includes('tape'), 'has file name');
  t.true(files[0].includes('TEST'), 'has log type');

  const file = fse.readFileSync(path.resolve(root, files[0]), 'utf-8');

  t.is(file, text, 'has text');

  fse.removeSync(root);
});

test('should create error log file', t => {
  const error = new Error('This is an error');

  const reporter = new Reporter(root);

  fse.mkdirpSync(root);

  reporter.logError(error);

  const files = fse.readdirSync(root);

  t.is(files.length, 1, 'creates file');

  const file = fse.readFileSync(path.resolve(root, files[0]), 'utf-8');

  t.true(file.includes(error.message), 'has error message');
  t.true(file.includes(error.stack), 'has error stack');

  fse.removeSync(root);
});