import test from 'tape';

import { EVENTS } from '@doombox-utils/types';

import { setup } from './_utils';

test('[Audio.setVolume] sets volume', t => {
  const audio = setup();

  const vNormal = 0.5;
  const vString = '0.5';
  const vNegative = -1;
  const vOverflow = 3;

  let n = 0;
  const expected = [vNormal, 0.5, 0, 1];

  audio.on(EVENTS.AUDIO.VOLUME, actual => {
    t.equal(actual, expected[n]);
    n += 1;
  });

  audio.setVolume(vNormal);
  t.equal(audio.volume, expected[0]);

  audio.setVolume(vString);
  t.equal(audio.volume, expected[1]);
  t.true(typeof audio.volume === 'number');

  audio.setVolume(vNegative);
  t.equal(audio.volume, expected[2]);

  audio.setVolume(vOverflow);
  t.equal(audio.volume, expected[3]);

  t.end();
});

test('[Audio.setVolume] ignores instance if it does not exist', t => {
  const audio = setup(true);

  audio.setVolume(0);

  t.pass('did not call instance functions');

  t.end();
});
