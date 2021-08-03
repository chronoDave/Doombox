import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export default createSlice({
  name: 'audio',
  initialState: {
    muted: false,
    volume: 1
  },
  reducers: {
    setMuted: (draft, action: PayloadAction<boolean>) => { draft.muted = action.payload; },
    setVolume: (draft, action: PayloadAction<number>) => { draft.volume = action.payload; }
  }
});
