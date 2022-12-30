import difference from '../../../utils/array/difference';
import unique from '../../../utils/array/unique';
import store from '../store';

import { setFolders } from './user.actions';

export const fetchLibrary = async () => {
  const library = await window.ipc.library.get();

  store.dispatch('setLibrary', library);
};

export const addFolders = async () => {
  const folders = await window.ipc.app.selectFolders();
  if (folders.length === 0) return;

  const { user } = store.get();
  await setFolders(unique(user.library.folders, folders));
  const library = await window.ipc.library.add(difference(
    folders,
    user.library.folders
  ));

  store.dispatch('setLibrary', library);
};

export const rebuildLibrary = async () => {
  const { user } = store.get();
  const library = await window.ipc.library.rebuild(user.library.folders as string[]);

  store.dispatch('setLibrary', library);
};
