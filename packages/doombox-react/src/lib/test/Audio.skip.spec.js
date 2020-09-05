import test from 'ava';

import { setup } from './_utils';

test('ignores if playlist does not exist', t => {
  const audio = setup();

  audio.skip();

  t.true(audio.create.notCalled);
});

test('sets index', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.skip(2);
  t.true(audio.create.calledOnce);
  t.is(audio.playlist.index, 2);
});

test('handles overflow', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.skip(1000);
  t.true(audio.create.calledOnce);
  t.is(audio.playlist.index, 3);
});
