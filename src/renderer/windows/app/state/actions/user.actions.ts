import produce from 'immer';

import store from '../store';

export const fetchUser = async () => {
  const user = await window.ipc.user.get();
  store.set(produce(draft => {
    draft.user = user;
  }));
};