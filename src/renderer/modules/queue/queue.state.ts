import type { Song } from '../../../types/library';

import createSelector from '../../lib/store/selector';
import store from '../../store';

export default createSelector(store, 'queue')(state => ({
  current: state.queue.songs[state.queue.index],
  title: state.queue.title,
  queue: state.queue.songs.reduce<Song[]>((acc, cur) => {
    const song = state.entities.song.get(cur);
    if (song) acc.push(song);
    return acc;
  }, [])
}));
