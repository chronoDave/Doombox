import test from 'tape';

import { isKeyOf } from '../../../../src/utils/validation';

test('[validation.isKeyOf] should return true if object', t => {
  t.true(isKeyOf('1', { 1: 1 }), 'casts number');
  t.true(isKeyOf('key', { key: 1 }), 'string');

  t.end();
});

test('[validation.isKeyOf] should return false if not object', t => {
  t.false(isKeyOf(1, { 1: 1 }), 'number');
  t.false(isKeyOf('1', { 2: 1 }), 'invalid key');
  t.false(isKeyOf('a', { b: { a: 1 } }), 'nested key');

  t.end();
});
