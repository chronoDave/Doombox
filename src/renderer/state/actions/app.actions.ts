import produce from 'immer';

import store from '../store';

export const setReady = (ready: boolean) => store.dispatch(produce(draft => {
  draft.app.ready = ready;
}), 'app.setReady');

export const fetchPaths = async () => {
  const { thumb, original } = await window.ipc.app.path();

  store.dispatch(produce(draft => {
    draft.app.path.cover = original;
    draft.app.path.thumb = thumb;
  }), 'app.imagePath');
};
