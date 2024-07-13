import type { Library } from '@doombox/types/library';

import produce from 'immer';

import difference from '@doombox/lib/list/difference';
import shuffle from '@doombox/lib/list/shuffle';
import unique from '@doombox/lib/list/unique';

import sortAlbums from '../../lib/sort/sortAlbums';
import sortLabels from '../../lib/sort/sortLabels';
import sortSongs from '../../lib/sort/sortSongs';
import * as Route from '../route';
import { imageSelector } from '../selectors';
import store from '../store';

import { play } from './player.actions';

const dispatch = (library: Library) => store.set(produce(draft => {
  draft.entities.song = new Map(library.songs
    .sort(sortSongs)
    .map(song => [song._id, song]));
  draft.entities.album = new Map(library.albums
    .sort(sortAlbums)
    .map(album => [album._id, album]));
  draft.entities.label = new Map(library.labels
    .sort(sortLabels)
    .map(label => [label._id, label]));
}));

export const fetchLibrary = async () => {
  const library = await window.ipc.library.get();
  dispatch(library);
};

export const reindexLibrary = async () => {
  store.set(produce(draft => {
    draft.route.app = Route.App.Scan;
  }));

  const library = await window.ipc.library.reindex(store.state.user.library.folders);

  dispatch(library);
  store.set(produce(draft => {
    draft.route.app = Route.App.Home;
  }));
};

export const rebuildLibrary = async () => {
  store.set(produce(draft => {
    draft.route.app = Route.App.Scan;
  }));

  const library = await window.ipc.library.rebuild();

  dispatch(library);
  store.set(produce(draft => {
    draft.route.app = Route.App.Home;
  }));
};

export const addFolders = async (folders: string[]) => {
  store.set(produce(draft => {
    draft.user.library.folders = unique(draft.user.library.folders)(folders);
  }));

  const user = await window.ipc.user.set(store.state.user);
  store.set(produce(draft => {
    draft.route.app = Route.App.Scan;
    draft.user.library.folders = user.library.folders;
  }));

  const library = await window.ipc.library.add(user.library.folders);

  dispatch(library);
  store.set(produce(draft => {
    draft.route.app = Route.App.Home;
  }));
};

export const removeFolders = async (folders: string[]) => {
  store.set(produce(draft => {
    draft.user.library.folders = difference(draft.user.library.folders)(folders);
  }));

  const user = await window.ipc.user.set(store.state.user);
  store.set(produce(draft => {
    draft.route.app = Route.App.Scan;
    draft.user.library.folders = user.library.folders;
  }));

  const library = await window.ipc.library.rebuild();

  dispatch(library);
  store.set(produce(draft => {
    draft.route.app = Route.App.Home;
  }));
};

export const search = async (query: string) => {
  if (query === '') {
    store.set(produce(draft => {
      draft.route.home = Route.Home.Library;
    }));
  } else {
    const library = await window.ipc.library.search(query);

    store.set(produce(draft => {
      draft.route.home = Route.Home.Search;
      draft.route.search = Route.Search.Song;
      draft.search.songs = library.songs
        .map(song => ({
          ...song,
          image: song.image ?
            imageSelector(draft)(song.image, 128) :
            null
        }));
      draft.search.albums = library.albums
        .map(album => ({
          ...album,
          image: album.image ?
            imageSelector(draft)(album.image, 128) :
            null
        }));
      draft.search.labels = library.labels;
    }));
  }
};

export const shuffleLibrary = () => {
  store.set(produce(draft => {
    draft.queue.songs = shuffle(Array.from(draft.entities.song.keys()));
    draft.queue.index = 0;
    draft.queue.title = 'Queue';
  }));

  play(store.state.queue.songs[0]);
};
