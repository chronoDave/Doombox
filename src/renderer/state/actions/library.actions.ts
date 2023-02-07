import type { Library } from '../../../types/library';
import type { State } from '../types';

import produce from 'immer';

import difference from '../../../utils/array/difference';
import unique from '../../../utils/array/unique';
import store from '../store';

const dispatchLibrary = (library: Library) => store.dispatch(produce(draft => {
  const songs = library.songs.map(song => song._id);

  draft.library.songs.map = new Map(library.songs.map(song => [song._id, song]));
  draft.library.songs.list = songs;
  draft.library.albums = library.albums;
  draft.library.labels = library.labels;
  draft.library.search.songs = songs;
  draft.library.search.albums = library.albums.map(({ _id }) => _id);
  draft.library.search.labels = library.labels.map(({ _id }) => _id);
}));

export const fetchLibrary = async () => {
  const library = await window.ipc.library.get();
  dispatchLibrary(library);
};

export const rebuildLibrary = async (force?: boolean) => {
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
  }));

  const library = await window.ipc.library.rebuild({
    folders: store.get().user.library.folders,
    force
  });

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.scanning = false;
  }));
};

export const addFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = unique(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
    draft.user.library.folders = user.library.folders;
  }));

  const library = await window.ipc.library.add(user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.scanning = false;
  }));
};

export const removeFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = difference(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
    draft.user.library.folders = user.library.folders;
  }));

  const library = await window.ipc.library.rebuild({
    folders: user.library.folders
  });

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.app.scanning = false;
  }));
};
