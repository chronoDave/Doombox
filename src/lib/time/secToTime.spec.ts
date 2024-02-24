import test from 'tape';

import secToTime from './secToTime';

test('[secToTime] returns seconds', t => {
  const seconds = 30;

  t.equal(secToTime(seconds).s, seconds, 'returns seconds');

  t.end();
});

test('[secToTime] returns remainder of seconds', t => {
  const seconds = 70;

  t.equal(secToTime(seconds).s, 10, 'returns remainder seconds');

  t.end();
});

test('[secToTime] returns minutes', t => {
  const seconds = 70;

  t.equal(secToTime(seconds).m, 1, 'returns minutes');

  t.end();
});

test('[secToTime] returns remainder of minutes', t => {
  const seconds = 60 * 60 + 240;

  t.equal(secToTime(seconds).m, 4, 'returns remainder minutes');

  t.end();
});

test('[secToTime] returns hours', t => {
  const seconds = 3600 * 2;

  t.equal(secToTime(seconds).h, 2, 'returns hours');

  t.end();
});

test('[secToTime] returns time', t => {
  const seconds = 10;
  const minutes = 36 * 60;
  const hours = 3600 * 23;

  const time = secToTime(hours + minutes + seconds);

  t.equal(time.s, 10, 'returns seconds');
  t.equal(time.m, 36, 'returns minutes');
  t.equal(time.h, 23, 'returns hours');

  t.end();
});
