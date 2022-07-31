import test from 'tape';

import { Shape } from '../../../../src/types';
import { parseShape } from '../../../../src/utils/shape';

test('[shape.parseShape] returns null if shape is invalid', t => {
  t.equal(parseShape('undefined'), null, 'returns null');

  t.end();
});

test('[shape.parseShape] returns null if shape is not shape', t => {
  t.equal(parseShape('[1, 2, 3]'), null, 'returns null');

  t.end();
});

test('[shape.parseShape] returns shape if string is shape', t => {
  const shape: Shape = { a: 1, b: 2, c: 3 };

  t.deepEqual(parseShape(JSON.stringify(shape)), shape, 'returns shape');

  t.end();
});
