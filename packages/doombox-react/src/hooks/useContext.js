import { useContext } from 'react';

// Utils
import { HOOK } from '../utils/const';
import {
  AudioContext,
  ThemeContext,
  LibraryContext
} from '../utils/context';

const createContextHook = (type, array, context) => {
  if (!type || !array.includes(type)) {
    throw new Error(`Invalid hook type called: ${type}`);
  }

  return useContext(context[type]);
};

export const useAudio = type => createContextHook(
  type, Object.values(HOOK.AUDIO), AudioContext
);

export const useTheme = type => createContextHook(
  type, Object.values(HOOK.THEME), ThemeContext
);

export const useLibrary = type => createContextHook(
  type, Object.values(HOOK.LIBRARY), LibraryContext
);
