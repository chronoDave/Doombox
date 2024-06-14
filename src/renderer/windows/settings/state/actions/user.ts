import produce from 'immer';

import difference from '@doombox/lib/list/difference';
import unique from '@doombox/lib/list/unique';

import store from '../store';

const set = (id: string) => (next: (folders: string[]) => string[]) => {
  const state = store.set(produce(draft => {
    draft.user.library.folders = next(draft.user.library.folders);
  }), `user.${id}`);

  window.ipc.user.set(state.user);
};

export const add = (folders: string[]) => set('add')(unique(folders));
export const remove = (folders: string[]) => set('remove')(difference(folders));
