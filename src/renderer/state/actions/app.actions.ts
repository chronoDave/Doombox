import produce from 'immer';

import store from '../store';

export const setReady = (ready: boolean) => store.dispatch(produce(draft => {
  draft.app.ready = ready;
}), 'app.setReady');

export const fetchDirectory = async () => {
  const directory = await window.ipc.app.directory();

  store.dispatch(produce(draft => {
    draft.app.directory = directory;
  }), 'app.directory');
};
