import test from 'tape';

import sum from './sum';

test('[sum] returns sum', t => {
  t.equal(sum([1, 2, 3, 4, 5]), 15, 'sums');

  t.end();
});
