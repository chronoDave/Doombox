import { useContext, createContext } from 'react';

export const AudioContext = createContext();
export const LanguageContext = createContext();

export const useAudio = () => useContext(AudioContext);
export const useTranslation = () => useContext(LanguageContext);
