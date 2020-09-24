import test from 'ava';

import { EVENTS } from '../../../../doombox-types';

import { setup } from './_utils';

test('resets playlist with no params', t => {
  t.plan(2);

  const audio = setup();

  const mockPlaylist = { index: 3, collection: [1, 2, 3, 4], name: 'Test' };
  audio.playlist = mockPlaylist;
  const expected = { index: 0, collection: [], name: '' };

  audio.on(EVENTS.AUDIO.PLAYLIST, actual => {
    t.deepEqual(actual, expected);
  });

  audio.set();

  t.deepEqual(audio.playlist, expected);
});

test('sets playlist', t => {
  t.plan(2);

  const audio = setup();
  const expected = { index: 3, collection: [1, 2, 3, 4], name: '' };

  audio.on(EVENTS.AUDIO.PLAYLIST, actual => {
    t.deepEqual(actual, expected);
  });

  audio.set(expected);

  t.deepEqual(audio.playlist, expected);
});

test('sets missing fields', t => {
  t.plan(2);

  const audio = setup();
  const incomplete = { collection: [1, 2, 3, 4], name: '' };
  const expected = { index: 0, ...incomplete };

  audio.on(EVENTS.AUDIO.PLAYLIST, actual => {
    t.deepEqual(actual, expected);
  });

  audio.set(incomplete);

  t.deepEqual(audio.playlist, expected);
});
