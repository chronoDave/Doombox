import produce from 'immer';

import store from '../state/store';

const fetchLibrary = async () => {
  const library = await window.ipc.library.get();

  store.dispatch(produce(draft => {
    draft.library.songs = new Map(library.songs.map(song => [song._id, song]));
    draft.library.albums = library.albums;
    draft.library.labels = library.labels;
  }));
};

export default fetchLibrary;
