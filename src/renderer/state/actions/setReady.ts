import produce from 'immer';

import store from '../store';

const setReady = () => store.dispatch(produce(draft => {
  draft.app.ready = true;
}));

export default setReady;
