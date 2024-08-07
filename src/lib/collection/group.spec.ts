import test from 'tape';

import group from './group';

test('[group] groups collection by key', t => {
  const collection = [
    { count: 1 },
    { count: 2 },
    { count: 3 },
    { count: 2 }
  ];
  const grouped = group(collection, 'count');

  t.true(grouped instanceof Map, 'is map');
  t.equal(grouped.size, 3, 'has groups');
  t.true(Array.isArray(grouped.get(1)), 'is group');
  t.equal(grouped.get(2)?.length, 2, 'groups all items');

  t.end();
});
