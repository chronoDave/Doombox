import test from 'tape';

import { toArray } from '../../array';

test('[array.toArray] should transform `x` into `[x]`', t => {
  const x = 3;

  t.deepEqual(
    toArray(3),
    [x],
    'does transform'
  );

  t.end();
});

test('[array.toArray] should not transform `[x]` into `[[x]]`', t => {
  const x = [3];

  t.deepEqual(
    toArray(x),
    x,
    'does not transform'
  );

  t.end();
});
