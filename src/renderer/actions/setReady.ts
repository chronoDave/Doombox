import produce from 'immer';

import store from '../state/store';

const setReady = () => store.dispatch(produce(draft => {
  draft.app.ready = true;
}));

export default setReady;
