import { createReduxSlice } from '../utils';

const initialState = {
  name: 'Playlist',
  cover: null,
  collection: []
};

const reducers = {
  setPlaylist: (state, payload) => ({ ...state, ...payload }),
  setName: (state, name) => ({ ...state, name }),
  setCover: (state, cover) => ({ ...state, cover }),
  setCollection: (state, collection) => ({ ...state, collection })
};

export default createReduxSlice('playlist', initialState, reducers);
