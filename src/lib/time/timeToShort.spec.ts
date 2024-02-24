import test from 'tape';

import secToTime from './secToTime';
import timeToShort from './timeToShort';

test('[timeToShort] should return formatted time', t => {
  t.equal(
    timeToShort(secToTime((3600 * 3) + (60 * 44) + 23)),
    '03:44:23',
    'formats time'
  );

  t.end();
});

test('[timeToShort] should omit hours if time is less than an hour', t => {
  t.equal(
    timeToShort(secToTime((60 * 44) + 23)),
    '44:23',
    'formats minified time'
  );

  t.end();
});

test('[timeToShort] should not omit hours if fullTime is true', t => {
  t.equal(
    timeToShort(secToTime((60 * 44) + 23), { fullTime: true }),
    '00:44:23',
    'formats full time'
  );

  t.end();
});
