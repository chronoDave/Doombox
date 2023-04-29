import test from 'tape';

import isObject from './isObject';

test('[validation.isObject] should return true if object', t => {
  t.true(isObject({}), 'empty object');
  t.true(isObject({ a: 1 }), 'simple object');

  t.end();
});

test('[validation.isObject] should return false if not object', t => {
  t.false(isObject(undefined), 'undefined');
  t.false(isObject('{}'), 'stringified object');
  t.false(isObject(null), 'null');
  t.false(isObject([]), 'array');

  t.end();
});
