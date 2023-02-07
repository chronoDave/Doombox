import produce from 'immer';

import levenshteinDistance from '../../../utils/string/levenshteinDistance';
import store from '../store';

export const search = async (query: string) => {
  const songs = await window.ipc.song.search({
    $string: {
      title: query
    }
  });

  store.dispatch(produce(draft => {
    draft.library.search.songs = songs
      .map(song => ({
        id: song._id,
        distance: song.title ?
          levenshteinDistance(song.title, query) :
          Number.MAX_SAFE_INTEGER
      }))
      .sort((a, b) => a.distance - b.distance)
      .map(({ id }) => id);
  }));
};
