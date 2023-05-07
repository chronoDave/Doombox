import test from 'tape';

import cx from './cx';

test('[cx] should merge strings', t => {
  t.equal(
    cx('a', 'b', 'c'),
    'a b c'
  );

  t.end();
});

test('[cx] should not merge boolean', t => {
  t.equal(
    cx(false && 'a'),
    ''
  );

  t.end();
});

test('[cx] should merge object', t => {
  t.equal(
    cx({ a: true, b: true, c: true }),
    'a b c'
  );

  t.end();
});

test('[cx] should merge string and object', t => {
  t.equal(
    cx({ a: true }, 'b', 'c'),
    'a b c'
  );

  t.end();
});

test('[cx] should not merge false object keys', t => {
  t.equal(
    cx({ a: false }),
    ''
  );

  t.end();
});
