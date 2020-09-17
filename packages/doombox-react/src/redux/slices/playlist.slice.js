import { createReduxSlice } from '@doombox/utils';

const initialState = {
  name: '',
  cover: null,
  collection: []
};

const reducers = {
  setPlaylist: (state, payload) => ({ ...state, payload }),
  setName: (state, name) => ({ ...state, name }),
  setCover: (state, cover) => ({ ...state, cover }),
  setCollection: (state, collection) => ({ ...state, collection })
};

export const playlistSlice = createReduxSlice('playlist', initialState, reducers);
