const test = require('tape');

const getCumulative = require('../getCumulative');

test('[getCumulative] returns cumulative value', t => {
  const array = [1, 2, 3, 4, 5];

  t.deepEqual(
    getCumulative(array),
    [0, 1, 3, 6, 10, 15],
    'returns cumulative'
  );

  t.end();
});
