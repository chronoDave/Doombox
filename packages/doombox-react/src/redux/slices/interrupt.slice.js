import { createSlice } from '@reduxjs/toolkit';

export const interruptSlice = createSlice({
  name: 'interrupt',
  initialState: {},
  reducers: {
    setInterrupt(state, action) {
      return action.payload;
    }
  }
});
