import { useContext } from 'react';

// Context
import { AudioContext, LanguageContext } from '../context';

export const useAudio = () => useContext(AudioContext);
export const useTranslation = () => useContext(LanguageContext);
