import type { State } from '../state';

import produce from 'immer';

import combineReducers from '../utils/combineReducer';

export default combineReducers<State>('app')({
  setReady: (ready: boolean) => produce(draft => {
    draft.app.ready = ready;
  }),
  setScanning: (scanning: boolean) => produce(draft => {
    draft.app.scanning = scanning;
  })
});
