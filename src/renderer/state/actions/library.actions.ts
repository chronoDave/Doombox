import produce from 'immer';

import difference from '../../../utils/array/difference';
import unique from '../../../utils/array/unique';
import store from '../store';

export const fetchLibrary = async () => {
  const library = await window.ipc.library.get();

  store.dispatch(produce(draft => {
    draft.library.songs = new Map(library.songs.map(song => [song._id, song]));
    draft.library.albums = library.albums;
    draft.library.labels = library.labels;
  }));
};

export const rebuildLibrary = async () => {
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
  }));

  const library = await window.ipc.library.rebuild(store.get().user.library.folders);

  store.dispatch(produce(draft => {
    draft.app.scanning = false;
    draft.library.songs = new Map(library.songs.map(song => [song._id, song]));
    draft.library.albums = library.albums;
    draft.library.labels = library.labels;
  }));
};

export const addFolders = async (folders: string[]) => {
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
    draft.user.library.folders = unique(draft.user.library.folders, folders);
  }));

  const library = await window.ipc.library.add(difference(
    folders,
    store.get().user.library.folders
  ));

  store.dispatch(produce(draft => {
    draft.app.scanning = false;
    draft.library.songs = new Map(library.songs.map(song => [song._id, song]));
    draft.library.albums = library.albums;
    draft.library.labels = library.labels;
  }));
};

export const removeFolders = async (folders: string[]) => {
  store.dispatch(produce(draft => {
    draft.app.scanning = true;
    draft.user.library.folders = difference(store.get().user.library.folders, folders);
  }));

  const library = await window.ipc.library.rebuild(store.get().user.library.folders);

  store.dispatch(produce(draft => {
    draft.app.scanning = false;
    draft.library.songs = new Map(library.songs.map(song => [song._id, song]));
    draft.library.albums = library.albums;
    draft.library.labels = library.labels;
  }));
};
