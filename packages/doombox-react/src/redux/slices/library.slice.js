import { createSlice } from '@reduxjs/toolkit';
import { ACTION } from '@doombox/utils';

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    pending: false,
    hasMore: false,
    size: 0,
    offset: 0,
    collection: []
  },
  reducers: {
    setLibraryStatus(state, action) {
      return ({
        ...state,
        pending: action.payload === ACTION.STATUS.PENDING
      });
    },
    setLibrary(state, action) {
      return ({
        pending: false,
        ...action.payload
      });
    }
  }
});
