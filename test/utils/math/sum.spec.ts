import test from 'tape';

import { sum } from 'src/utils/math';

test('[math.sum] should return sum', t => {
  t.equal(
    sum([1, 2, 3, 4, 5]),
    15,
    'returns sum'
  );

  t.end();
});
