import { createSlice } from '@reduxjs/toolkit';

export const songSlice = createSlice({
  name: 'song',
  initialState: [],
  reducers: {
    setSong(state, action) {
      return action.payload;
    }
  }
});
