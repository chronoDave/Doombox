import { useContext } from 'react';
import { TYPE } from '@doombox/utils';

// Utils
import { HOOK } from '../utils/const';
import {
  AudioContext,
  IpcContext,
  ThemeContext
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

export const useIpc = type => createContextHook(
  type, Object.values(TYPE.IPC), IpcContext
);

export const useTheme = () => useContext(ThemeContext);
