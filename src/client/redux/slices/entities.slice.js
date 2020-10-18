import { createReduxSlice } from '../utils';

const initialState = {
  albums: {
    map: {},
    list: []
  },
  labels: {
    map: {},
    list: []
  },
  songs: {
    map: {},
    list: []
  },
  images: {
    map: {},
    list: []
  }
};

const normalize = (collection = []) => ({
  list: collection,
  map: collection.reduce((acc, cur) => ({
    ...acc,
    [cur._id]: cur
  }), {})
});

const reducers = {
  setImages: (state, payload) => ({ ...state, images: normalize(payload) }),
  setAlbums: (state, payload) => ({ ...state, albums: normalize(payload) }),
  setLabels: (state, payload) => ({ ...state, labels: normalize(payload) }),
  setSongs: (state, payload) => ({ ...state, songs: normalize(payload) })
};

export const entitySlice = createReduxSlice('entities', initialState, reducers);
