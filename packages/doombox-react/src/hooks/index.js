import { useContext } from 'react';

// Utils
import { AudioContext } from '../utils/context';

export const useAudio = () => useContext(AudioContext);
