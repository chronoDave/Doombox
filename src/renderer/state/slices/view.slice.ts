import type { State } from '../types';

import produce from 'immer';

import createSlice from '../../lib/state/createSlice';

export default createSlice<State>('view')({
  setViewApp: (view: State['view']['app']) => produce(draft => {
    draft.view.app = view;
  }),
  setViewSettings: (view: State['view']['settings']) => produce(draft => {
    draft.view.settings = view;
  })
});
