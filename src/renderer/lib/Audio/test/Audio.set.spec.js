const test = require('tape');

const { EVENTS } = require('../../../../utils/types');

const setup = require('./_utils');

const mockCollection = [
  { duration: 3 },
  { duration: 6 },
  { duration: 9 },
  { duration: 12 }
];

test('[Audio.set] resets playlist with no params', t => {
  const audio = setup();

  const mockPlaylist = {
    index: 3,
    collection: mockCollection,
    duration: 500,
    name: 'Test'
  };
  audio.playlist = mockPlaylist;
  const expected = {
    index: 0,
    collection: [],
    name: null,
    duration: 0
  };

  audio.on(EVENTS.AUDIO.PLAYLIST, actual => {
    t.deepEqual(
      actual,
      expected,
      'emits playlist'
    );
  });

  audio.set();

  t.deepEqual(
    audio.playlist,
    expected,
    'resets playlist'
  );

  t.end();
});

test('[Audio.set] sets playlist', t => {
  const audio = setup();
  const expected = {
    index: 3,
    collection: mockCollection,
    name: null,
    duration: 0
  };

  audio.on(EVENTS.AUDIO.PLAYLIST, actual => {
    t.deepEqual(
      actual,
      expected,
      'emits playlist'
    );
  });

  audio.set(expected);

  t.deepEqual(
    audio.playlist,
    expected,
    'sets playlist'
  );

  t.end();
});

test('[Audio.set] sets missing fields', t => {
  const audio = setup();
  const incomplete = { collection: mockCollection };
  const expected = {
    index: 0,
    duration: 30,
    name: null,
    ...incomplete
  };

  audio.on(EVENTS.AUDIO.PLAYLIST, actual => {
    t.deepEqual(
      actual,
      expected,
      'emits playlist'
    );
  });

  audio.set(incomplete);

  t.deepEqual(
    audio.playlist,
    expected,
    'adds missing fields'
  );

  t.end();
});
