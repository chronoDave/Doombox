import { createSlice } from '@reduxjs/toolkit';
import { CONFIG } from '@doombox/utils';

export const configSlice = createSlice({
  name: 'config',
  initialState: CONFIG,
  reducers: {
    setConfig(state, action) {
      return action.payload;
    }
  }
});
