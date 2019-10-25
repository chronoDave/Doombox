import { useContext } from 'react';

// Utils
import {
  RouteContext,
  AudioContext
} from '../utils/context';

export const useRoute = () => useContext(RouteContext);
export const useAudio = () => useContext(AudioContext);
