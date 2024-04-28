import produce from 'immer';

import difference from '../../../../lib/list/difference';
import unique from '../../../../lib/list/unique';
import store from '../store';

const set = (folders: string[], label: string) => {
  store.dispatch(produce(draft => {
    draft.user.library.folders = folders;
  }), label);

  window.ipc.user.set(store.get().user);
};

export const add = (folders: string[]) => set(unique(
  store.get().user.library.folders,
  folders
), 'library.add');

export const remove = (folders: string[]) => set(difference(
  store.get().user.library.folders,
  folders
), 'library.remove');
