import { createContext } from 'react';

export const AudioContext = {
  Volume: createContext(),
  Method: createContext(),
  Playlist: createContext(),
  Current: createContext(),
  Position: createContext()
};
