import type { Song } from '@doombox/types/library';

import store from '../../state/store';

export default store.select(state => {
  const queue = state.queue.songs.reduce<Song[]>((acc, cur) => {
    const song = state.entities.song.get(cur);
    if (song) acc.push(song);
    return acc;
  }, []);

  return ({
    index: state.queue.index,
    current: state.queue.songs[state.queue.index],
    title: state.queue.title,
    duration: queue.reduce((acc, cur) => acc + (cur.duration ?? 0), 0),
    queue
  });
});
