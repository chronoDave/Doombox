import produce from 'immer';

import store from '../store';

export const fetchPath = async () => {
  const dir = await window.ipc.os.image();
  store.set(produce(draft => {
    draft.dir.thumbs = dir;
  }));
};
