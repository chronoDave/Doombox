import type { State } from '../state';

import produce from 'immer';

import combineReducers from '../utils/combineReducer';

export default combineReducers<State>('view')({
  setViewApp: (view: State['view']['app']) => produce(draft => {
    draft.view.app = view;
  }),
  setViewSettings: (view: State['view']['settings']) => produce(draft => {
    draft.view.settings = view;
  })
});
