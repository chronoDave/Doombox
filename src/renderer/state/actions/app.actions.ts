import produce from 'immer';

import store from '../store';

export const setReady = (ready: boolean) => store.dispatch(produce(draft => {
  draft.app.ready = ready;
}), 'app.setReady');

export const fetchImagePath = async () => {
  const imagePath = await window.ipc.app.getImagePath();

  store.dispatch(produce(draft => {
    draft.app.path.image = imagePath;
  }), 'app.imagePath');
};
