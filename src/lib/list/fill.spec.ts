import test from 'tape';

import fill from './fill';

test('[fill] returns filled array', t => {
  t.deepEqual(
    fill(3, i => i),
    [0, 1, 2],
    'fills array'
  );

  t.end();
});
