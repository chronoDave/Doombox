const test = require('tape');

const pascalize = require('../pascalize');

test('[pascalize] should pascalize string', t => {
  const original = 'original string';
  const expected = 'Original String';

  t.equal(
    pascalize(original),
    expected,
    'pascalizes string'
  );

  t.end();
});