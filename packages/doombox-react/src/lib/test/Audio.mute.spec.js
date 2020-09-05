import test from 'ava';

import { EVENTS } from '@doombox/utils';

import { setup } from './_utils';

test('mutes', t => {
  t.plan(6);

  const audio = setup();

  let n = 0;
  const expected = [true, true, false];

  audio.on(EVENTS.AUDIO.MUTED, actual => {
    t.is(actual, expected[n]);
    n += 1;
  });

  audio.mute();
  t.true(audio.muted);

  audio.mute(true);
  t.true(audio.muted);

  audio.mute();
  t.false(audio.muted);
});

test('ignores instance if it does not exist', t => {
  const audio = setup(true);

  audio.mute();

  t.pass('did not call instance functions');
});
