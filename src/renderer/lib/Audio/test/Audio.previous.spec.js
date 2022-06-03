const test = require('tape');

const setup = require('./_utils');

test('[Audio.previous] ignores if collection does not exist', t => {
  const audio = setup();

  audio.previous();
  t.true(
    audio.create.notCalled,
    'does not call create'
  );

  t.end();
});

test('[Audio.previous] decreases index', t => {
  const audio = setup();
  audio.playlist = {
    index: 4,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.previous();
  t.true(
    audio.create.calledOnce,
    'calls create'
  );
  t.equal(
    audio.playlist.index,
    3,
    'decreases playlist index'
  );

  t.end();
});

test('[Audio.previous] handles overflow', t => {
  const audio = setup();
  audio.playlist = {
    index: 0,
    collection: [1, 2, 3, 4],
    name: 'Test'
  };

  audio.previous();
  t.true(
    audio.create.calledOnce,
    'calls create'
  );
  t.equal(
    audio.playlist.index,
    3,
    'playlist index reverse overflows'
  );

  t.end();
});
