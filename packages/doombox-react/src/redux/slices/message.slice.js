import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    setMessage(state, action) {
      return action.payload;
    }
  }
});
