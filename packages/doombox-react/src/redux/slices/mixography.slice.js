import { createSlice } from '@reduxjs/toolkit';

export const mixographySlice = createSlice({
  name: 'mixography',
  initialState: [],
  reducers: {
    setMixography(state, action) {
      return action.payload;
    }
  }
});
