const test = require('tape');
const path = require('path');
const fs = require('fs');

const Reporter = require('./reporter');

const root = path.resolve(__dirname, 'test');

test('should create log file', t => {
  const text = 'This is a test';

  const reporter = new Reporter(root);

  fs.mkdirSync(root, { recursive: true });

  reporter.log(text, 'tape', 'TEST');

  const files = fs.readdirSync(root);

  t.equal(files.length, 1, 'creates file');
  t.true(files[0].includes('tape'), 'has file name');
  t.true(files[0].includes('TEST'), 'has log type');

  const file = fs.readFileSync(path.resolve(root, files[0]), 'utf-8');

  t.equal(file, text, 'has text');

  fs.rmdirSync(root, { recursive: true });

  t.end();
});

test('should create error log file', t => {
  const error = new Error('This is an error');

  const reporter = new Reporter(root);

  fs.mkdirSync(root, { recursive: true });

  reporter.logError(error);

  const files = fs.readdirSync(root);

  t.equal(files.length, 1, 'creates file');

  const file = fs.readFileSync(path.resolve(root, files[0]), 'utf-8');

  t.true(file.includes(error.message), 'has error message');
  t.true(file.includes(error.stack), 'has error stack');

  fs.rmdirSync(root, { recursive: true });

  t.end();
});
