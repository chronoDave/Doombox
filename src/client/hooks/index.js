import { useRef, useContext, createContext } from 'react';
import { useTheme } from '@material-ui/core';

export const AudioContext = createContext();
export const LanguageContext = createContext();

export const useAudio = () => useContext(AudioContext);
export const useTranslation = () => useContext(LanguageContext);

export const useHover = ({ enter, leave, delay = {} }) => {
  const refEnter = useRef(null);
  const refLeave = useRef(null);

  const theme = useTheme();

  const onEnter = () => {
    refEnter.current = setTimeout(
      enter,
      delay.enter || theme.transitions.duration.enteringScreen
    );

    if (refLeave.current) {
      clearTimeout(refLeave.current);
      refLeave.current = null;
    }
  };

  const onLeave = () => {
    refLeave.current = setTimeout(
      leave,
      delay.leave || theme.transitions.duration.leavingScreen
    );

    if (refEnter.current) {
      clearTimeout(refEnter.current);
      refEnter.current = null;
    }
  };

  return ({ onEnter, onLeave });
};
