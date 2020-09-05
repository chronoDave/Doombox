import test from 'ava';

import { setup } from './_utils';

test('ignores if collection does not exist', t => {
  const audio = setup();

  audio.next();
  t.true(audio.create.notCalled);
});

test('increases index', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.next();
  t.true(audio.create.calledOnce);
  t.is(audio.playlist.index, 1);
});

test('handles overflow', t => {
  const audio = setup();
  audio.playlist = {
    index: 4,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.next();
  t.true(audio.create.calledOnce);
  t.is(audio.playlist.index, 0);
});
