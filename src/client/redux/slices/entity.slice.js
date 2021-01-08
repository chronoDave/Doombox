import { createReduxSlice, normalize } from '../utils';

const initialState = {
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
  },
  images: {
    map: {},
    list: []
  }
};

const reducers = {
  setLibrary: (state, payload) => ({
    ...state,
    songs: normalize(payload.songs),
    albums: normalize(payload.albums),
    labels: normalize(payload.labels)
  }),
  setImages: (state, payload) => ({ ...state, images: normalize(payload) })
};

export default createReduxSlice('entities', initialState, reducers);
