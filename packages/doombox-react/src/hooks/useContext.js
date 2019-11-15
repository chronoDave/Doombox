import { useContext } from 'react';

// Utils
import * as Context from '../utils/context';
import { AUDIO_HOOKS } from '../utils/const';

export const useRoute = () => useContext(Context.RouteContext);
export const useAudio = type => {
  if (!type || !Object.values(AUDIO_HOOKS).includes(type)) {
    throw new Error('Invalid hook type called');
  }

  return useContext(Context[`Audio${type}Context`]);
};
