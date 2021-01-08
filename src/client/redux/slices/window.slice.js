import { WINDOW } from '@doombox-utils/types';

import { createReduxSlice } from '../utils';

const initialState = {
  overlay: null,
  view: WINDOW.VIEW.LIBRARY
};

const reducers = {
  setOverlay: (state, overlay) => ({ ...state, overlay }),
  setView: (state, view) => ({ ...state, view })
};

export default createReduxSlice('window', initialState, reducers);
