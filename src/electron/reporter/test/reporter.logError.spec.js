const test = require('tape');
const path = require('path');
const fs = require('fs');

const Reporter = require('../reporter');

const root = path.resolve(__dirname, 'test');

test('[reporter.logError] should create error log file', t => {
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
