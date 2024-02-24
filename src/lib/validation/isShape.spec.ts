import test from 'tape';

import isShape from './isShape';

test('[validation.isShape] should return true if shape', t => {
  t.true(isShape({}), 'empty shape');
  t.true(isShape({ a: 1 }), 'shallow shape');
  t.true(isShape({ a: 1, b: { c: 2 } }), 'nested shape');
  t.true(isShape({ a: 1, b: { c: 2, d: '', e: false }, f: [null] }), 'complex shape');

  t.end();
});

test('[validation.isShape] should return false if not shape', t => {
  t.false(isShape([]), 'array');
  t.false(isShape({ a: undefined }), 'undefined');

  t.end();
});
