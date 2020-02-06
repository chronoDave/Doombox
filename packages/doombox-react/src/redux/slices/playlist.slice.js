import { createSlice } from '@reduxjs/toolkit';
import { ACTION } from '@doombox/utils';

// Utils
import { shuffleArray } from '../../utils';

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    action: null,
    autoplay: false,
    name: 'Default Playlist',
    collection: [],
    src: {}
  },
  reducers: {
    setPlaylist(state, action) {
      return ({
        ...action.payload,
        action: ACTION.AUDIO.PLAYLIST_SET
      });
    },
    shufflePlaylist(state) {
      return ({
        ...state,
        collection: shuffleArray(state.collection),
        action: ACTION.AUDIO.SHUFFLE
      });
    },
    addPlaylist(state, action) {
      return ({
        ...state,
        collection: [
          ...state.collection,
          ...action.payload
        ],
        action: ACTION.AUDIO.PLAYLIST_ADD
      });
    }
  }
});
