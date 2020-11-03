import { useContext } from 'react';

// Context
import {
  AudioContext,
  LanguageContext,
  ThemeContext
} from '../context';

export const useAudio = () => useContext(AudioContext);
export const useTranslation = () => useContext(LanguageContext);
export const useTheme = () => useContext(ThemeContext);
