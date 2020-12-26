const test = require('tape');

const zPad = require('../zPad');

test('[zPad] adds zero padding', t => {
  const original = 3;
  const expected = '003';

  t.equal(
    zPad(original, original),
    expected,
    'adds zero padding'
  );

  t.end();
});
