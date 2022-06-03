import { createReduxSlice } from '../utils';

const initialState = {
  name: null,
  collection: [],
  index: 0,
  duration: 0
};

const reducers = {
  setPlaylist: (state, payload) => ({ ...state, ...payload }),
  setPlaylistIndex: (state, index) => ({ ...state, index })
};

export default createReduxSlice('playlist', initialState, reducers);
