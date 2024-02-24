import test from 'tape';

import secToTime from './secToTime';
import timeToLong from './timeToLong';

test('[timeToLong] should return formatted time', t => {
  t.equal(
    timeToLong(secToTime((3600 * 3) + (60 * 44) + 23)),
    '3h 44m 23s',
    'formats time'
  );

  t.end();
});

test('[timeToLong] should omit hours if time is less than an hour', t => {
  t.equal(
    timeToLong(secToTime((60 * 44) + 23)),
    '44m 23s',
    'formats minified time'
  );

  t.end();
});
