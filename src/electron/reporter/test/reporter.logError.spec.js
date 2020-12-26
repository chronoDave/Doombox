const test = require('tape');
const path = require('path');
const fs = require('fs');

const { setup, cleanup } = require('./_utils');

test('[reporter.logError] should create error log file', t => {
  const { reporter, root } = setup();

  const error = new Error('This is an error');

  reporter.logError(error);

  const file = fs.readFileSync(
    path.resolve(root, fs.readdirSync(root)[0]),
    'utf-8'
  );

  t.true(
    file.includes(error.message),
    'has error message'
  );
  t.true(
    file.includes(error.stack),
    'has error stack'
  );

  cleanup();

  t.end();
});
