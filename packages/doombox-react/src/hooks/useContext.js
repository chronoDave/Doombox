import { useContext } from 'react';
import { TYPE } from '@doombox/utils';

// Utils
import { HOOK } from '../utils/const';
import {
  IpcContext,
  AudioContext
} from '../utils/context';

export const useAudio = type => {
  if (!type || !Object.values(HOOK.AUDIO).includes(type)) {
    throw new Error('Invalid hook type called');
  }

  return useContext(AudioContext[type]);
};

export const useIpc = type => {
  if (!type || !Object.values(TYPE.IPC).includes(type)) {
    throw new Error('Invalid hook type called');
  }

  return useContext(IpcContext[type]);
};
