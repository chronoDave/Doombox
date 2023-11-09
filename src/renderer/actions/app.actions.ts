import produce from 'immer';

import store from '../store';

export const fetchDirectory = async () => {
  const directory = await window.ipc.app.directory();

  store.dispatch(produce(draft => {
    draft.app.directory = directory;
  }), 'app.directory');
};
