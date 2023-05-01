import test from 'tape';

import difference from './difference';

test('[difference] returns difference A \\ B', t => {
  t.deepEqual(
    difference([1, 3], [1, 3, 5]),
    [],
    'does not return B \\ A'
  );

  t.deepEqual(
    difference([1, 3, 5], [1, 3]),
    [5],
    'returns A \\ B'
  );

  t.end();
});
