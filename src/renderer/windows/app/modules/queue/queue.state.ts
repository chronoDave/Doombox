import type { Song } from '@doombox/types/library';

import createSelector from '@doombox/renderer/store/selector';

import store from '../../store';

export default createSelector(store, 'queue')(state => ({
  index: state.queue.index,
  current: state.queue.songs[state.queue.index],
  title: state.queue.title,
  queue: state.queue.songs.reduce<Song[]>((acc, cur) => {
    const song = state.entities.song.get(cur);
    if (song) acc.push(song);
    return acc;
  }, [])
}));
