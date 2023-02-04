import produce from 'immer';

import store from '../store';

export const setReady = (ready: boolean) => store.dispatch(produce(draft => {
  draft.app.ready = ready;
}));
