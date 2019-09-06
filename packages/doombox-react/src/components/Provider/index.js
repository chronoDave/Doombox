import { useContext } from 'react';

import {
  RouteContext,
  AudioContext
} from './context';

export const useRouter = () => useContext(RouteContext);
export const useAudio = () => useContext(AudioContext);

export { default as AudioProvider } from './AudioProvider';
export { default as RouteProvider } from './RouteProvider';
