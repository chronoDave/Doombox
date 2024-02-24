import test from 'tape';

import Time from './time';

test('[time.toShort] should return short formatted time', t => {
  t.equal(new Time(
    (3600 * 3) +
    (60 * 44) +
    23
  ).toShort(), '03:44:23', 'formats time');

  t.end();
});

test('[time.toShort] should omit hours if time is less than an hour', t => {
  t.equal(new Time(
    (60 * 44) +
    23
  ).toShort(), '44:23', 'formats time');

  t.end();
});

test('[time.toShort] should not omit hours if minify is false', t => {
  t.equal(new Time(
    (60 * 44) +
    23
  ).toShort({ minify: false }), '00:44:23', 'formats time');

  t.end();
});

test('[time.toLong] should return long formatted time', t => {
  t.equal(new Time(
    (3600 * 3) +
    (60 * 44) +
    23
  ).toLong(), '3h 44m 23s', 'formats time');

  t.end();
});

test('[time.toLong] should omit hours if time is less than an hour', t => {
  t.equal(new Time(
    (60 * 44) +
    23
  ).toLong(), '44m 23s', 'formats time');

  t.end();
});
