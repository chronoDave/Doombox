const test = require('tape');
const fs = require('fs');
const path = require('path');

const { setup, cleanup } = require('./_utils');

test('[reporter.log] should create log file', t => {
  const { reporter, root } = setup();

  const text = 'This is a test';

  reporter.log(text, 'TEST');

  const files = fs.readdirSync(root);

  t.equal(
    files.length,
    1,
    'creates file'
  );
  t.true(
    files[0].includes('TEST'),
    'has log type'
  );

  const file = fs.readFileSync(path.resolve(root, files[0]), 'utf-8');

  t.equal(
    file,
    text,
    'has text'
  );

  cleanup();

  t.end();
});
