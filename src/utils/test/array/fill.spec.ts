import test from 'tape';

import { fill } from '../../array';

test('[array.fill] should create filled array', t => {
  const n = 3;

  t.equal(
    fill(n, () => n).length,
    n,
    'fills array'
  );

  t.end();
});

test('[array.fill] should not create object references', t => {
  const n = 3;

  const arr = fill<number[]>(n, () => []);
  for (let i = 0; i < n; i += 1) arr[0].push(i);

  t.equal(
    arr[1].length,
    0,
    'does not create references'
  );

  t.end();
});
