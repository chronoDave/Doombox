import test from 'tape';

import { setup } from './_utils';

test('[Audio.skip] ignores if playlist does not exist', t => {
  const audio = setup();

  audio.skip();

  t.true(
    audio.create.notCalled,
    'does not call create'
  );

  t.end();
});

test('[Audio.skip] sets index', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.skip(2);
  t.true(
    audio.create.calledOnce,
    'calls create'
  );
  t.equal(
    audio.playlist.index,
    2,
    'sets playlist index'
  );

  t.end();
});

test('[Audio.skip] handles overflow', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.skip(1000);
  t.true(
    audio.create.calledOnce,
    'calls create'
  );
  t.equal(
    audio.playlist.index,
    audio.playlist.collection.length - 1,
    'clamps max playlist index'
  );

  audio.skip(-1000);
  t.equal(
    audio.playlist.index,
    0,
    'clamps min playlist index'
  );

  t.end();
});
