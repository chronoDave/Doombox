import test from 'tape';

import { EVENTS } from '@doombox-utils/types';

import { setup } from './_utils';

test('mutes', t => {
  const audio = setup();

  let n = 0;
  const expected = [true, true, false];

  audio.on(EVENTS.AUDIO.MUTED, actual => {
    t.equal(actual, expected[n]);
    n += 1;
  });

  audio.mute();
  t.true(audio.muted);

  audio.mute(true);
  t.true(audio.muted);

  audio.mute();
  t.false(audio.muted);

  t.end();
});

test('ignores instance if it does not exist', t => {
  const audio = setup(true);

  audio.mute();

  t.pass('did not call instance functions');

  t.end();
});
