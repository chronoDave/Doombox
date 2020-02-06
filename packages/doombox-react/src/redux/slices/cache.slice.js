import { createSlice } from '@reduxjs/toolkit';
import { CACHE } from '@doombox/utils';

export const cacheSlice = createSlice({
  name: 'cache',
  initialState: CACHE,
  reducers: {
    setCache(state, action) {
      return action.payload;
    }
  }
});
