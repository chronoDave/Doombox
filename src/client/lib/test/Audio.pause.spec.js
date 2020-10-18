import test from 'tape';

import { STATUS } from '@doombox-utils/types';

import { setup } from './_utils';

test('should pause if playing', t => {
  const audio = setup();
  audio.status = STATUS.AUDIO.PLAYING;

  audio.pause();
  t.true(audio.instance.pause.calledOnce, 'called instace.pause()');

  t.end();
});

test('should play if paused', t => {
  const audio = setup();
  audio.status = STATUS.AUDIO.PAUSED;

  audio.pause();
  t.true(audio.instance.play.calledOnce, 'called instance.play()');

  t.end();
});

test('should ignore if no instance exists', t => {
  const audio = setup(true);
  audio.status = STATUS.AUDIO.PAUSED;

  audio.pause();
  t.pass('did not call instance functions');

  t.end();
});

test('should ignore if status is not playing or paused', t => {
  const audio = setup();
  audio.status = STATUS.AUDIO.STOPPED;

  audio.pause();
  t.true(audio.instance.play.notCalled, 'did not call instance.play()');
  t.true(audio.instance.pause.notCalled, 'did not call instance.pause()');

  t.end();
});
