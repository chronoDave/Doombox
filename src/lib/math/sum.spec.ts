import test from 'tape';

import { sum, sumSelect } from './sum';

test('[sum] returns sum', t => {
  t.equal(sum([1, 2, 3, 4, 5]), 15, 'sums');

  t.end();
});

test('[sumSelect] returns sum', t => {
  t.equal(
    sumSelect([
      { x: 1 },
      { x: 2 },
      { x: 3 },
      { x: 4 },
      { x: 5 }
    ], x => x.x),
    15,
    'sums'
  );

  t.end();
});
