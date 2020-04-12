import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    name: 'Unnamed Mixtape',
    collection: [],
    cover: {}
  },
  reducers: {
    setPlaylist(state, action) {
      return action.payload;
    }
  }
});
