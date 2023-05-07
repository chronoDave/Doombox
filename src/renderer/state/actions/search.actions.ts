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
      $or: [{
        $string: {
          title: query
        }
      }, {
        $string: {
          artist: query
        }
      }, {
        $string: {
          album: query
        }
      }, {
        $string: {
          albumartist: query
        }
      }]
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

export const searchAlbums = async (query: string) => {
  if (query === '') {
    store.dispatch(produce(draft => {
      draft.search.albums = null;
    }), 'search.searchAlbums');
  } else {
    const albums = await window.ipc.search.album({
      $or: [{
        $string: {
          album: query
        }
      }, {
        $string: {
          albumartist: query
        }
      }, {
        $string: {
          label: query
        }
      }]
    });

    store.dispatch(produce(draft => {
      draft.search.albums = albums
        .map(album => ({
          album,
          distance: album.album ?
            levenshteinDistance(album.album, query) :
            Number.MAX_SAFE_INTEGER
        }))
        .sort((a, b) => a.distance - b.distance)
        .map(({ album }) => album._id);
    }), 'search.searchAlbums');
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
        label: query
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
