import { createReduxSlice, normalize } from '../utils';

const initialState = {
  query: '',
  songs: {
    map: {},
    list: []
  },
  albums: {
    map: {},
    list: []
  },
  labels: {
    map: {},
    list: []
  }
};

const reducers = {
  setQuery: (state, query) => ({ ...state, query }),
  setSongs: (state, payload) => ({ ...state, songs: normalize(payload) }),
  setAlbums: (state, payload) => ({ ...state, albums: normalize(payload) }),
  setLabels: (state, payload) => ({ ...state, labels: normalize(payload) }),
};

export default createReduxSlice('search', initialState, reducers);
