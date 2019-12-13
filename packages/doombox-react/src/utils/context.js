import { createContext } from 'react';

export const AudioContext = {
  Library: createContext(),
  Volume: createContext(),
  Method: createContext(),
  Playlist: createContext(),
  Current: createContext(),
  Metadata: createContext(),
  Position: createContext(),
  Image: createContext()
};

export const IpcContext = {
  Keybind: createContext(),
  Message: createContext(),
  Interrupt: createContext(),
  Config: createContext()
};

export const ThemeContext = createContext();
