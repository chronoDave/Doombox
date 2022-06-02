const test = require('tape');

const { clamp } = require('..');

test('[clamp] should return `min` value if value is smaller than `min`', t => {
  const min = -5;
  const max = 10;
  const original = -10;

  t.equal(
    clamp(min, max, original),
    min,
    'returns min value'
  );

  t.end();
});

test('[clamp] should return `max` value if value is smaller than `max`', t => {
  const min = -5;
  const max = 10;
  const original = 20;

  t.equal(
    clamp(min, max, original),
    max,
    'returns max value'
  );

  t.end();
});

test('[clamp] should return `n` value if value is between `min` and `max`', t => {
  const min = -5;
  const max = 10;
  const original = 5;

  t.equal(
    clamp(min, max, original),
    original,
    'returns original value'
  );

  t.end();
});
