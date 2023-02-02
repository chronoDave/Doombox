import produce from 'immer';

import store from '../store';

const rebuildLibrary = async () => {
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

export default rebuildLibrary;
