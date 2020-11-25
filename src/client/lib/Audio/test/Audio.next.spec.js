import test from 'tape';

import { setup } from './_utils';

test('[Audio.next] ignores if collection does not exist', t => {
  const audio = setup();

  audio.next();
  t.true(audio.create.notCalled);

  t.end();
});

test('[Audio.next] increases index', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.next();
  t.true(audio.create.calledOnce);
  t.equal(audio.playlist.index, 1);

  t.end();
});

test('[Audio.next] handles overflow', t => {
  const audio = setup();
  audio.playlist = {
    index: 4,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.next();
  t.true(audio.create.calledOnce);
  t.equal(audio.playlist.index, 0);

  t.end();
});
