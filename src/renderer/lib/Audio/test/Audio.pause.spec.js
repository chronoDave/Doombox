const test = require('tape');

const { STATUS } = require('../../../../types');

const setup = require('./_utils');

test('[Audio.pause] should pause if playing', t => {
  const audio = setup();
  audio.status = STATUS.AUDIO.PLAYING;

  audio.pause();
  t.true(
    audio.instance.pause.calledOnce,
    'calls pause'
  );

  t.end();
});

test('[Audio.pause] should play if paused', t => {
  const audio = setup();
  audio.status = STATUS.AUDIO.PAUSED;

  audio.pause();
  t.true(
    audio.instance.play.calledOnce,
    'calls play'
  );

  t.end();
});

test('[Audio.pause] should ignore if no instance exists', t => {
  const audio = setup(true);
  audio.status = STATUS.AUDIO.PAUSED;

  audio.pause();
  t.pass('does not call instance functions');

  t.end();
});

test('[Audio.pause] should ignore if status is not playing or paused', t => {
  const audio = setup();
  audio.status = STATUS.AUDIO.STOPPED;

  audio.pause();
  t.true(
    audio.instance.play.notCalled,
    'does not call play'
  );
  t.true(
    audio.instance.pause.notCalled,
    'does not call pause'
  );

  t.end();
});
