import test from 'tape';

import debounce from './debounce';

test('[function.debounce] should debounce', async t => {
  let count = 0;
  const debounced = debounce(() => { count += 1; }, 100);

  debounced();
  await debounced();
  await debounced();

  t.equal(count, 2, 'debounces');

  t.end();
});

test('[function.debounce] should return promise', async t => {
  const debounced = debounce(() => true, 100);

  debounced();
  const actual = await debounced();

  t.true(actual, 'returns promise');

  t.end();
});
