import test from 'tape';

import { setup } from './_utils';

test('ignores if collection does not exist', t => {
  const audio = setup();

  audio.previous();
  t.true(audio.create.notCalled);

  t.end();
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
  t.equal(audio.playlist.index, 3);

  t.end();
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
  t.equal(audio.playlist.index, 3);

  t.end();
});
