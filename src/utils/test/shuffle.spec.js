const test = require('tape');

const { shuffle } = require('..');

test('[shuffle] shuffles array', t => {
  const limit = 100;
  const items = [];

  for (let i = 0; i < limit; i += 1) {
    items.push(i);
  }

  t.notDeepEqual(
    shuffle(items),
    items,
    'shuffles array'
  );

  t.end();
});
