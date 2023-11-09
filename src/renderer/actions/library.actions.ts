import type { Library } from '../../types/library';
import type { State } from '../types/state';

import produce from 'immer';

import difference from '../../utils/array/difference';
import unique from '../../utils/array/unique';
import store from '../store';
import { Route } from '../types/state';

const dispatchLibrary = (library: Library) => store.dispatch(produce(draft => {
  draft.entities.song = new Map(library.songs
    .sort((a, b) => {
      if (!a.label || !b.label) return 0;
      if (a.label !== b.label) return a.label.localeCompare(b.label);
      if (!a.year || !b.year) return 0;
      if (a.year !== b.year) return a.year - b.year;
      if (!a.album || !b.album) return 0;
      if (a.album !== b.album) return a.album.localeCompare(b.album);
      if (!a.track.no || !b.track.no) return 0;
      return a.track.no - b.track.no;
    })
    .map(song => [song._id, song]));
  draft.entities.album = new Map(library.albums
    .sort((a, b) => {
      if (!a.label || !b.label) return 0;
      if (a.label !== b.label) return a.label.localeCompare(b.label);
      if (!a.year || !b.year) return 0;
      return a.year - b.year;
    })
    .map(album => [album._id, album]));
  draft.entities.label = new Map(library.labels
    .sort((a, b) => {
      if (!a.label || !b.label) return 0;
      return a.label.localeCompare(b.label);
    })
    .map(label => [label._id, label]));
}), 'library.dispatchLibrary');

export const fetchLibrary = async () => {
  const library = await window.ipc.library.get();
  dispatchLibrary(library);
};

export const reindexLibrary = async () => {
  store.dispatch(produce(draft => {
    draft.route = Route.Scan;
  }), 'library.reindexLibrary');

  const library = await window.ipc.library
    .reindex(store.get().user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route = Route.Main;
  }), 'library.reindexLibrary');
};

export const rebuildLibrary = async () => {
  store.dispatch(produce(draft => {
    draft.route = Route.Scan;
  }), 'library.rebuildLibrary');

  const library = await window.ipc.library.rebuild();

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route = Route.Main;
  }), 'library.rebuildLibrary');
};

export const addFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = unique(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.route = Route.Scan;
    draft.user.library.folders = user.library.folders;
  }), 'library.addFolders');

  const library = await window.ipc.library.add(user.library.folders);

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route = Route.Main;
  }), 'library.addFolders');
};

export const removeFolders = async (folders: string[]) => {
  const state = produce<State>(draft => {
    draft.user.library.folders = difference(draft.user.library.folders, folders);
  })(store.get());

  const user = await window.ipc.user.set(state.user);
  store.dispatch(produce(draft => {
    draft.route = Route.Scan;
    draft.user.library.folders = user.library.folders;
  }), 'library.removeFolders');

  const library = await window.ipc.library.rebuild();

  dispatchLibrary(library);
  store.dispatch(produce(draft => {
    draft.route = Route.Main;
  }), 'library.removeFolders');
};
