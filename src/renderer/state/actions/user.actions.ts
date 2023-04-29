import produce from 'immer';

import store from '../store';

export const fetchUser = async () => {
  const user = await window.ipc.user.get();
  store.dispatch(produce(draft => {
    draft.user = user;
  }), 'user.fetchUser');
};
