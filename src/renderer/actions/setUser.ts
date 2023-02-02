import produce from 'immer';

import store from '../state/store';

const setUser = async (folders: string[]) => {
  const user = await window.ipc.user.set({
    key: 'library',
    value: { folders }
  });

  store.dispatch(produce(draft => {
    draft.user = user;
  }));
};

export default setUser;
