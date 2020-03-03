import { createSlice } from '@reduxjs/toolkit';

export const librarySlice = createSlice({
  name: 'library',
  initialState: [],
  reducers: {
    setLibrary(state, action) {
      return action.payload;
    }
  }
});
