import produce from 'immer';

import difference from '@doombox/lib/list/difference';
import unique from '@doombox/lib/list/unique';

import store from '../store';

const set = (next: (folders: string[]) => string[]) => {
  store.set(produce(draft => {
    draft.user.library.folders = next(draft.user.library.folders);
  }));

  window.ipc.user.set(store.state.user);
};

export const add = (folders: string[]) => set(unique(folders));
export const remove = (folders: string[]) => set(difference(folders));
