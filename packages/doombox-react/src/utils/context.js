import { createContext } from 'react';

export const AudioContext = {
  Library: createContext(),
  Volume: createContext(),
  Method: createContext(),
  Playlist: createContext(),
  Collection: createContext(),
  Current: createContext(),
  Player: createContext(),
  Position: createContext()
};

export const IpcContext = {
  Method: createContext(),
  Keybind: createContext(),
  Message: createContext(),
  Interrupt: createContext(),
  Config: createContext(),
  Image: createContext(),
  System: createContext()
};

export const RouteContext = {
  Method: createContext(),
  Location: createContext()
};

export const ThemeContext = createContext();
