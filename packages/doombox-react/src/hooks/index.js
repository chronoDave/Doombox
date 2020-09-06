import {
  useContext,
  createContext
} from 'react';

export const AudioContext = createContext();
export const useAudio = () => useContext(AudioContext);
