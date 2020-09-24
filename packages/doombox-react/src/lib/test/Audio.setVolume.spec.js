import test from 'ava';

import { EVENTS } from '../../../../doombox-types';

import { setup } from './_utils';

test('sets volume', t => {
  t.plan(14);

  const audio = setup();

  const vNormal = 0.5;
  const vString = '0.5';
  const vNegative = -1;
  const vOverflow = 3;

  let n = 0;
  const expected = [vNormal, 0.5, 0, 1];

  audio.on(EVENTS.AUDIO.VOLUME, actual => {
    t.is(actual, expected[n]);
    n += 1;
  });

  audio.setVolume(vNormal);
  t.is(audio.volume, expected[0]);
  t.is(audio.instance.volume, expected[0]);

  audio.setVolume(vString);
  t.is(audio.volume, expected[1]);
  t.is(audio.instance.volume, expected[1]);
  t.true(typeof audio.volume === 'number');
  t.true(typeof audio.instance.volume === 'number');

  audio.setVolume(vNegative);
  t.is(audio.volume, expected[2]);
  t.is(audio.instance.volume, expected[2]);

  audio.setVolume(vOverflow);
  t.is(audio.volume, expected[3]);
  t.is(audio.instance.volume, expected[3]);
});

test('ignores instance if it does not exist', t => {
  const audio = setup(true);

  audio.setVolume(0);

  t.pass('did not call instance functions');
});
