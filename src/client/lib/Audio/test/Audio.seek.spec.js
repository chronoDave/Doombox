import test from 'tape';

import { EVENTS } from '@doombox-utils/types';

import { setup } from './_utils';

test('[Audio.seek] should ignore if instance does not exist', t => {
  const audio = setup(true);

  audio.seek();
  t.pass('does not call instance functions');

  t.end();
});

test('[Audio.seek] should seek', t => {
  t.plan(2);

  const audio = setup();
  const vSeek = 3;

  audio.on(EVENTS.AUDIO.POSITION, pos => {
    t.equal(
      pos,
      vSeek,
      'emits position'
    );
  });

  audio.seek(vSeek);
  t.true(
    audio.instance.seek.calledOnce,
    'calls seek'
  );

  t.end();
});
