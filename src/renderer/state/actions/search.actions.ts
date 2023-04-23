import produce from 'immer';

import levenshteinDistance from '../../../utils/string/levenshteinDistance';
import store from '../store';

export const searchSongs = async (query: string) => {
  if (query === '') {
    store.dispatch(produce(draft => {
      draft.search.songs = null;
    }), 'search.searchSongs');
  } else {
    const songs = await window.ipc.search.song({
      $string: {
        title: query
      }
    });

    store.dispatch(produce(draft => {
      draft.search.songs = songs
        .map(song => ({
          song,
          distance: song.title ?
            levenshteinDistance(song.title, query) :
            Number.MAX_SAFE_INTEGER
        }))
        .sort((a, b) => a.distance - b.distance)
        .map(({ song }) => song._id);
    }), 'search.searchSongs');
  }
};

export const searchLabels = async (query: string) => {
  if (query === '') {
    store.dispatch(produce(draft => {
      draft.search.labels = null;
    }), 'search.searchLabels');
  } else {
    const labels = await window.ipc.search.label({
      $string: {
        title: query
      }
    });

    store.dispatch(produce(draft => {
      draft.search.labels = labels
        .map(label => ({
          label,
          distance: label.label ?
            levenshteinDistance(label.label, query) :
            Number.MAX_SAFE_INTEGER
        }))
        .sort((a, b) => a.distance - b.distance)
        .map(({ label }) => label._id);
    }), 'search.searchLabels');
  }
};
