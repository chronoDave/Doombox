import test from 'tape';

import wrap from './wrap';

test('[wrap] should return value if within min and max', t => {
  const value = 3;

  t.equal(wrap(1, 5, value), value, 'returns value');

  t.end();
});

test('[wrap] should return max if value is smaller than min', t => {
  const min = 1;
  const max = 5;

  t.equal(wrap(min, max, -1), max, 'returns max');

  t.end();
});

test('[wrap] should return min if value is bigger than max', t => {
  const min = 1;
  const max = 5;

  t.equal(wrap(min, max, 7), min, 'returns min');

  t.end();
});
