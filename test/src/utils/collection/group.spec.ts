import test from 'tape';

import group from '../../../../src/utils/collection/group';
import isObject from '../../../../src/utils/validation/isObject';

test('[group] groups collection by key', t => {
  const collection = [
    { count: 1 },
    { count: 2 },
    { count: 3 },
    { count: 2 }
  ];
  const grouped = group(collection, 'count');

  t.true(isObject(grouped), 'is object');
  t.equal(Object.keys(grouped).length, 3, 'has groups');
  t.true(Array.isArray(grouped[1]), 'is group');
  t.equal(grouped[2].length, 2, 'groups all items');

  t.end();
});
