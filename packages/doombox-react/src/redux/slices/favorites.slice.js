import { createSlice } from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    setFavorites(state, action) {
      return action.payload;
    }
  }
});
