import test from 'tape';

import { setup } from './_utils';

test('[Audio.play] should ignore if instance and playlist do not exist', t => {
  const audio = setup(true);

  audio.play();
  t.true(
    audio.create.notCalled,
    'does not call create'
  );

  t.end();
});

test('[Audio.play] should create new song if instance does not exist and playlist has songs', t => {
  const audio = setup(true);

  audio.playlist = { collection: [], index: 0 };
  audio.play();
  t.true(
    audio.create.notCalled,
    'does not call create'
  );

  audio.playlist = { collection: ['song'], index: 0 };
  audio.play();
  t.true(
    audio.create.calledOnce,
    'calls create'
  );

  t.end();
});

test('[Audio.play] should resume if instance exists', t => {
  const audio = setup();

  audio.play();
  t.true(
    audio.instance.play.calledOnce,
    'calls play'
  );
  t.true(
    audio.create.notCalled,
    'does not call create'
  );

  t.end();
});