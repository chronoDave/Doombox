import { createReduxSlice, normalizeCollection } from '../utils';

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
    images: payload.images ?
      normalizeCollection(payload.images) :
      state.images,
    songs: normalizeCollection(payload.songs),
    albums: normalizeCollection(payload.albums),
    labels: normalizeCollection(payload.labels)
  }),
  setImages: (state, payload) => ({ ...state, images: normalizeCollection(payload) })
};

export default createReduxSlice('entities', initialState, reducers);
