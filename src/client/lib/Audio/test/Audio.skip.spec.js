import test from 'tape';

import { setup } from './_utils';

test('[Audio.skip] ignores if playlist does not exist', t => {
  const audio = setup();

  audio.skip();

  t.true(audio.create.notCalled);

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
  t.true(audio.create.calledOnce);
  t.equal(audio.playlist.index, 2);

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
  t.true(audio.create.calledOnce);
  t.equal(audio.playlist.index, 3);

  t.end();
});
