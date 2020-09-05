import test from 'ava';
import sinon from 'sinon';

import { EVENTS } from '@doombox/utils';

import { setup } from './_utils';

test('should ignore if instance does not exist', t => {
  const audio = setup(true);

  audio.seek();
  t.pass('did not call instance functions');

  sinon.restore();
});

test('should seek', t => {
  t.plan(2);

  const audio = setup();
  const vSeek = 3;

  audio.on(EVENTS.AUDIO.POSITION, pos => {
    t.is(pos, vSeek);
  });

  audio.seek(vSeek);
  t.true(audio.instance.seek.calledOnce, 'called instance.seek()');

  sinon.restore();
});
