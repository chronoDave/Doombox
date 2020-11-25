import test from 'tape';

import { EVENTS } from '@doombox-utils/types';

import { setup } from './_utils';

test('[Audio.add] adds songs to playlist collection', t => {
  const mockPlaylist = {
    collection: [1, 2, 3],
    index: 0
  };

  const audio = setup();
  audio.playlist = mockPlaylist;

  const newSong = 4;
  const newSongs = [5, 6];

  let n = 0;
  const expected = [
    mockPlaylist.collection.length + 1,
    mockPlaylist.collection.length + newSongs.length + 1
  ];

  audio.on(EVENTS.AUDIO.PLAYLIST, ({ collection }) => {
    t.equal(collection.length, expected[n]);
    n += 1;
  });

  audio.add();
  t.equal(audio.playlist.collection.length, mockPlaylist.collection.length);

  audio.add([]);
  t.equal(audio.playlist.collection.length, mockPlaylist.collection.length);

  audio.add(newSong);
  t.equal(audio.playlist.collection.length, expected[0]);

  audio.add(newSongs);
  t.equal(audio.playlist.collection.length, expected[1]);

  t.end();
});
