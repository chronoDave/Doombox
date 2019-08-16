import { useContext } from 'react';
import { AudioContext } from './AudioContext';

export const useAudio = () => useContext(AudioContext);
export { default as AudioProvider } from './AudioProvider';
