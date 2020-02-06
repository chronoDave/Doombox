import { useContext } from 'react';

// Utils
import { HOOK } from '../utils/const';
import {
  AudioContext,
  RouteContext
} from '../utils/context';

const createContextHook = (type, array, context) => {
  if (!type || !array.includes(type)) {
    throw new Error(`Invalid hook type called: ${type}`);
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext(context[type]);
};

export const useAudio = type => createContextHook(
  type, Object.values(HOOK.AUDIO), AudioContext
);

export const useRoute = type => createContextHook(
  type, Object.values(HOOK.ROUTE), RouteContext
);
