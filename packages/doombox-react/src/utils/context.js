import { createContext } from 'react';

export const AudioContext = {
  Library: createContext(),
  Volume: createContext(),
  Method: createContext(),
  Playlist: createContext(),
  Current: createContext(),
  Metadata: createContext(),
  Position: createContext()
};

export const IpcContext = {
  Method: createContext(),
  Keybind: createContext(),
  Message: createContext(),
  Interrupt: createContext()
};

export const ThemeContext = createContext();
