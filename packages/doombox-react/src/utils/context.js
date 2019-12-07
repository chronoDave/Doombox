import { createContext } from 'react';

export const AudioContext = {
  Volume: createContext(),
  Method: createContext(),
  Playlist: createContext(),
  Current: createContext(),
  Metadata: createContext(),
  Position: createContext()
};

export const MediaSessionContext = {
  State: createContext(),
  Method: createContext(),
  Metadata: createContext()
};

export const ThemeContext = {
  Method: createContext(),
  DarkMode: createContext(),
  Colors: createContext()
};

export const LibraryContext = {
  Method: createContext(),
  Songs: createContext()
};
