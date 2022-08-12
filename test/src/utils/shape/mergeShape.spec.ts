import test from 'tape';

import { mergeShape } from '../../../../src/utils/shape';

test('[shape.mergeShape] merges if type is equal', t => {
  t.equal(
    mergeShape({ a: 1 }, { a: 2 }).a,
    2,
    'merges'
  );
  t.equal(
    mergeShape({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }).a.b.c,
    2,
    'merges recursively'
  );

  t.end();
});

test('[shape.mergeShape] does not merge if type is not equal', t => {
  t.equal(
    mergeShape({ a: 1 }, { a: '2' }).a,
    1,
    'does not merge'
  );
  t.equal(
    mergeShape({ a: { b: { c: 1 } } }, { a: { b: 2 } }).a.b.c,
    1,
    'does not merge recursively'
  );

  t.end();
});

test('[shape.mergeShape] merges arrays', t => {
  t.deepEqual(
    // @ts-ignore
    mergeShape([1, 2, 3], [2, 3, 4]),
    [2, 3, 4],
    'merges array'
  );
  t.deepEqual(
    // @ts-ignore
    mergeShape([1, 2, 3], [3]),
    [3, 2, 3],
    'merges array wit holes'
  );

  t.end();
});

test('[shape.mergeShape] does not merge new keys', t => {
  t.false(
    // @ts-ignore
    mergeShape({ a: 1 }, { a: 2, b: 1 }).b,
    'does not create new keys'
  );

  t.end();
});
