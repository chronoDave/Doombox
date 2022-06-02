import { createReduxSlice } from '../utils';

const normalize = payload => payload.map(({ _id }) => _id);

const initialState = {
  query: '',
  songs: [],
  albums: [],
  labels: []
};

const reducers = {
  setQuery: (state, query) => ({ ...state, query: query.toString() }),
  setSongs: (state, data) => ({ ...state, songs: normalize(data) }),
  setAlbums: (state, data) => ({ ...state, albums: normalize(data) }),
  setLabels: (state, data) => ({ ...state, labels: normalize(data) })
};

export default createReduxSlice('search', initialState, reducers);
