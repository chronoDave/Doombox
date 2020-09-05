import test from 'ava';

import { setup } from './_utils';

test('ignores if collection does not exist', t => {
  const audio = setup();

  audio.previous();
  t.true(audio.create.notCalled);
});

test('decreases index', t => {
  const audio = setup();
  audio.playlist = {
    index: 4,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.previous();
  t.true(audio.create.calledOnce);
  t.is(audio.playlist.index, 3);
});

test('handles overflow', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.previous();
  t.true(audio.create.calledOnce);
  t.is(audio.playlist.index, 3);
});
