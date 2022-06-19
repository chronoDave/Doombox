import test from 'tape';

import { shuffle } from '../../array';

test('[array.shuffle] should shuffle array', t => {
  const arr = [];
  for (let i = 0; i < 100; i += 1) arr.push(i);

  const a = shuffle(arr);
  t.notDeepEqual(
    arr,
    a,
    'shuffles array'
  );

  const b = shuffle(arr);
  t.notDeepEqual(
    a,
    b,
    'shuffles randomly'
  );

  t.end();
});
