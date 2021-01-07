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
  map: (() => {
    const object = {};

    for (let i = 0; i < collection.length; i += 1) {
      object[collection[i]._id] = collection[i];
    }

    return object;
  })()
});

const reducers = {
  setImages: (state, payload) => ({ ...state, images: normalize(payload) }),
  setAlbums: (state, payload) => ({ ...state, albums: normalize(payload) }),
  setLabels: (state, payload) => ({ ...state, labels: normalize(payload) }),
  setSongs: (state, payload) => ({ ...state, songs: normalize(payload) })
};

export default createReduxSlice('entities', initialState, reducers);
