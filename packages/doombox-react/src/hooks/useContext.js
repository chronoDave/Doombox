import { useContext } from 'react';

// Utils
import { AUDIO_HOOKS } from '../utils/const';
import { AudioContext } from '../utils/context';

export const useAudio = type => {
  if (!type || !Object.values(AUDIO_HOOKS).includes(type)) {
    throw new Error('Invalid hook type called');
  }

  return useContext(AudioContext[type]);
};
