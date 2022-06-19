import test from 'tape';

import { splitRr } from '../../array';

test('[array.splitRr] should split array round-robin', t => {
  const arr = Array(99).fill(0);

  t.equal(
    splitRr(arr, 2).length,
    2,
    'slices in equal slices'
  );

  t.equal(
    splitRr(arr, 5)[4].length,
    19, // 99 / 5 => 19.8 => 99 - 20 * 4 => 19
    'uneven slice contains remainder'
  );

  t.end();
});
