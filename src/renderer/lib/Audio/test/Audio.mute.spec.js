const test = require('tape');

const { EVENTS } = require('../../../../utils/types');

const setup = require('./_utils');

test('[Audio.mute] mutes', t => {
  const audio = setup();

  let n = 0;
  const expected = [true, false, true];

  audio.on(EVENTS.AUDIO.MUTED, actual => {
    t.equal(
      actual,
      expected[n],
      'emits muted'
    );
    n += 1;
  });

  audio.mute();
  t.true(audio.muted, 'mutes');

  audio.mute();
  t.false(audio.muted, 'does not mute');

  audio.mute();
  t.true(audio.muted, 'mutes');

  t.end();
});

test('[Audio.mute] ignores instance if it does not exist', t => {
  const audio = setup(true);

  audio.mute();

  t.pass('does not call instance functions');

  t.end();
});
