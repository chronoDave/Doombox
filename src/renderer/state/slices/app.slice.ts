import type { State } from '../types';

import produce from 'immer';

import createSlice from '../../lib/state/createSlice';

export default createSlice<State>('app')({
  setReady: (ready: boolean) => produce(draft => {
    draft.app.ready = ready;
  }),
  setScanning: (scanning: boolean) => produce(draft => {
    draft.app.scanning = scanning;
  })
});
