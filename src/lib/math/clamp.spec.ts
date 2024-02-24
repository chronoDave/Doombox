import test from 'tape';

import clamp from './clamp';

test('[clamp] should return value if within min and max', t => {
  const value = 3;

  t.equal(clamp(1, 5, value), value, 'returns value');

  t.end();
});

test('[clamp] should return min if value is smaller than min', t => {
  const min = 1;

  t.equal(clamp(min, 5, -1), min, 'returns min');

  t.end();
});

test('[clamp] should return max if value is bigger than max', t => {
  const max = 5;

  t.equal(clamp(1, max, 7), max, 'returns max');

  t.end();
});
