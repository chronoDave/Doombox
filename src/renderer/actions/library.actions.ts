import type { Library } from '../../types/library';
import type { State } from '../types/state';

import produce from 'immer';

import difference from '../../utils/array/difference';
import shuffle from '../../utils/array/shuffle';
import unique from '../../utils/array/unique';
import { imageSelector } from '../selectors';
import store from '../store';
import * as Route from '../types/route';
import {
  sortAlbums,
  sortDistanceAlbums,
  sortDistanceLabels,
  sortDistanceSongs,
  sortLabels,
  sortSongs
} from '../utils/sort';

import { setQueue } from './queue.actions';

const dispatchLibrary = (library: Library) => store.dispatch(produce(draft => {
  draft.entities.song = new Map(library.songs
    .sort(sortSongs)
    .map(song => [song._id, song]));
  draft.entities.album = new Map(library.albums
    .sort(sortAlbums)
    .map(album => [album._id, album]));
  draft.entities.label = new Map(library.labels
    .sort(sortLabels)
    .map(label => [label._id, label]));
}), 'library.dispatchLibrary');

export const fetchLibrary = async () => {
  const library = await window.ipc.library.get();
  dispatchLibrary(library);
};

export const reindexLibrary = async () => {
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Scan;
  }), 'library.reindexLibrary');

  const library = await window.ipc.library
    .reindex(store.get().user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Home;
  }), 'library.reindexLibrary');
};

export const rebuildLibrary = async () => {
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Scan;
  }), 'library.rebuildLibrary');

  const library = await window.ipc.library.rebuild();

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Home;
  }), 'library.rebuildLibrary');
};

export const addFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = unique(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Scan;
    draft.user.library.folders = user.library.folders;
  }), 'library.addFolders');

  const library = await window.ipc.library.add(user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Home;
  }), 'library.addFolders');
};

export const removeFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = difference(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Scan;
    draft.user.library.folders = user.library.folders;
  }), 'library.removeFolders');

  const library = await window.ipc.library.rebuild();

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route.app = Route.App.Home;
  }), 'library.removeFolders');
};

export const search = async (query: string) => {
  if (query === '') {
    store.dispatch(produce(draft => {
      draft.route.home = Route.Home.Library;
    }), 'library.search');
  } else {
    const library = await window.ipc.library.search(query);

    store.dispatch(produce(draft => {
      draft.route.home = Route.Home.Search;
      draft.route.search = Route.Search.Song;
      draft.search.songs = library.songs
        .sort(sortDistanceSongs(query))
        .map(song => ({
          ...song,
          image: song.image ?
            imageSelector(song.image, 128) :
            null
        }));
      draft.search.albums = library.albums
        .sort(sortDistanceAlbums(query))
        .map(album => ({
          ...album,
          image: album.image ?
            imageSelector(album.image, 128) :
            null
        }));
      draft.search.labels = library.labels
        .sort(sortDistanceLabels(query));
    }), 'library.search');
  }
};

export const shuffleLibrary = () => {
  setQueue(shuffle(Array.from(store.get().entities.song.keys())), 'Library');
};
