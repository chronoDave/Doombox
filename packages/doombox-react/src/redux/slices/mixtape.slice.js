import { createSlice } from '@reduxjs/toolkit';
import { ACTION } from '@doombox/utils';

// Utils
import { shuffleArray } from '../../utils';

export const mixtapeSlice = createSlice({
  name: 'mixtape',
  initialState: {
    name: 'Default Mixtape',
    collection: [],
    action: null,
    cover: {}
  },
  reducers: {
    setMixtape(state, action) {
      return ({
        ...state,
        action: ACTION.PLAYLIST.SET,
        ...action.payload
      });
    },
    addMixtape(state, action) {
      return ({
        ...state,
        action: ACTION.PLAYLIST.ADD,
        collection: [
          ...state.collection,
          ...action.payload
        ]
      });
    },
    shuffleMixtape(state) {
      return ({
        ...state,
        action: ACTION.PLAYLIST.SET,
        collection: shuffleArray(state.collection)
      });
    }
  }
});
