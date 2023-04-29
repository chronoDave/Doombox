import type { Shape } from '../../types/primitives';

import test from 'tape';

import parse from './parse';

test('[shape.parse] returns null if shape is invalid', t => {
  t.equal(parse('undefined'), null, 'returns null');

  t.end();
});

test('[shape.parse] returns null if shape is not shape', t => {
  t.equal(parse('[1, 2, 3]'), null, 'returns null');

  t.end();
});

test('[shape.parse] returns shape if string is shape', t => {
  const shape: Shape = { a: 1, b: 2, c: 3 };

  t.deepEqual(parse(JSON.stringify(shape)), shape, 'returns shape');

  t.end();
});
