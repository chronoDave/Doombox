import produce from 'immer';

import difference from '../../../utils/array/difference';
import unique from '../../../utils/array/unique';
import store from '../store';

const addFolders = async (folders: string[]) => {
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

export default addFolders;
