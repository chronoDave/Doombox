import test from 'tape';

import { getShape } from '../../../../src/utils/shape';

test('[get] should return properties', t => {
  const shape = {
    string: 'string',
    number: 4,
    boolean: true,
    null: null,
    array: [
      'string',
      4,
      true,
      null,
      ['string', 4, true, null]
    ]
  };

  t.deepEqual(getShape(shape, 'string'), shape.string);
  t.deepEqual(getShape(shape, 'number'), shape.number);
  t.deepEqual(getShape(shape, 'boolean'), shape.boolean);
  t.deepEqual(getShape(shape, 'null'), shape.null);
  t.deepEqual(getShape(shape, 'array'), shape.array);

  t.end();
});

test('[get] should not mutate original properties', t => {
  const shape = {
    string: 'string',
    number: 4,
    boolean: true,
    null: null,
    array: [
      'string',
      4,
      true,
      null,
      ['string', 4, true, null]
    ]
  };

  const actual = getShape(shape, 'string');

  t.notDeepEqual(shape, actual, 'should not mutate original object');

  t.end();
});

test('[get] should return nested property', t => {
  const shape = {
    string: 'string',
    number: 4,
    boolean: true,
    null: null,
    array: [
      'string',
      4,
      true,
      null,
      ['string', 4, true, null]
    ]
  };

  t.deepEqual(getShape(shape, 'array.4'), shape.array[4]);

  t.end();
});

test('[get] should return null if property does not exist', t => {
  t.deepEqual(getShape({}, 'a.b.c'), null);

  t.end();
});
