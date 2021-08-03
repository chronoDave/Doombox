import { configureStore } from '@reduxjs/toolkit';

// Middleware
import { logger } from './middleware';

// Slices
import audioSlice from './slices/audio.slice';

// Actions
export const { setMuted, setVolume } = audioSlice.actions;

const store = configureStore({
  reducer: {
    [audioSlice.name]: audioSlice.reducer
  },
  middleware: [logger]
});

export type State = ReturnType<typeof store.getState>;
export default store;
