import test from 'tape';

import unique from './unique';

test('[unique] returns unique values', t => {
  const a = [1, 2, 3];
  const b = [3, 4, 5];

  t.deepEqual(
    unique(a, b),
    [1, 2, 3, 4, 5],
    'unique'
  );

  t.end();
});
