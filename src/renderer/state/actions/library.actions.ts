import type { Library } from '../../../types/library';
import type { State } from '../state';

import produce from 'immer';

import difference from '../../../utils/array/difference';
import unique from '../../../utils/array/unique';
import levenshteinDistance from '../../../utils/string/levenshteinDistance';
import store from '../store';

const dispatchLibrary = (library: Library) => store.dispatch(produce(draft => {
  draft.entities.song = new Map(library.songs.map(song => [song._id, song]));
  draft.entities.album = new Map(library.albums.map(album => [album._id, album]));
  draft.entities.label = new Map(library.labels.map(label => [label._id, label]));
}), 'library.dispatchLibrary');

export const fetchLibrary = async () => {
  const library = await window.ipc.library.get();
  dispatchLibrary(library);
};

export const rebuildLibrary = async (force?: boolean) => {
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
  }), 'library.rebuildLibrary');

  const library = await window.ipc.library.rebuild({
    folders: store.get().user.library.folders,
    force
  });

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.scanning = false;
  }), 'library.rebuildLibrary');
};

export const addFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = unique(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
    draft.user.library.folders = user.library.folders;
  }), 'library.addFolders');

  const library = await window.ipc.library.add(user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.scanning = false;
  }), 'library.addFolders');
};

export const removeFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = difference(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
    draft.user.library.folders = user.library.folders;
  }), 'library.removeFolders');

  const library = await window.ipc.library.rebuild({
    folders: user.library.folders
  });

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.scanning = false;
  }), 'library.removeFolders');
};

export const searchSongs = async (query: string) => {
  if (query === '') {
    store.dispatch(produce(draft => {
      draft.search.songs = null;
    }), 'library.searchSongs');
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
    }), 'library.searchSongs');
  }
};
