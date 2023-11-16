import type { Song } from '../../../../types/library';

import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'libraryQueue')(state => ({
  current: state.queue.songs[state.queue.index],
  queue: state.queue.songs.reduce<Song[]>((acc, cur) => {
    const song = state.entities.song.get(cur);
    if (song) acc.push(song);
    return acc;
  }, [])
}));
