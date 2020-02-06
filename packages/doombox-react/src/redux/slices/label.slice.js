import { createSlice } from '@reduxjs/toolkit';

export const labelSlice = createSlice({
  name: 'label',
  initialState: {
    collection: []
  },
  reducers: {
    setLabel(state, action) {
      return action.payload;
    }
  }
});
