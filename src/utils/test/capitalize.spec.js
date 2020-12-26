const test = require('tape');

const capitalize = require('../capitalize');

test('[capitalize] shoud capitalize string', t => {
  const original = 'test';
  const expected = 'Test';

  t.equal(
    capitalize(original),
    expected,
    'capitalizes string'
  );

  t.end();
});
