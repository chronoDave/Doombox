import type { Library } from '../../types/library';
import type { State } from '../types/state';

import produce from 'immer';

import difference from '../../utils/array/difference';
import unique from '../../utils/array/unique';
import store from '../store';
import { Route } from '../types/state';
import { sortAlbums, sortLabels, sortSongs } from '../utils/sort';

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
    draft.app.route = Route.Scan;
  }), 'library.reindexLibrary');

  const library = await window.ipc.library
    .reindex(store.get().user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.route = Route.App;
  }), 'library.reindexLibrary');
};

export const rebuildLibrary = async () => {
  store.dispatch(produce(draft => {
    draft.app.route = Route.Scan;
  }), 'library.rebuildLibrary');

  const library = await window.ipc.library.rebuild();

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.route = Route.App;
  }), 'library.rebuildLibrary');
};

export const addFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = unique(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.app.route = Route.Scan;
    draft.user.library.folders = user.library.folders;
  }), 'library.addFolders');

  const library = await window.ipc.library.add(user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.route = Route.App;
  }), 'library.addFolders');
};

export const removeFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = difference(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.app.route = Route.Scan;
    draft.user.library.folders = user.library.folders;
  }), 'library.removeFolders');

  const library = await window.ipc.library.rebuild();

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.route = Route.App;
  }), 'library.removeFolders');
};
