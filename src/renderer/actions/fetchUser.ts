import produce from 'immer';

import store from '../state/store';

const fetchUser = async () => {
  const user = await window.ipc.user.all();
  store.dispatch(produce(draft => {
    draft.user = user;
  }));
};

export default fetchUser;
