import { createReduxSlice } from '../utils';

const initialState = {
  overlay: null
};

const reducers = {
  setOverlay: (state, overlay) => ({ ...state, overlay })
};

export default createReduxSlice('window', initialState, reducers);
