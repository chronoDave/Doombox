import { useRef } from 'react';

import { useTheme } from './useContext';

export default ({ enter, leave, delay = {} }) => {
  const refEnter = useRef(null);
  const refLeave = useRef(null);

  const theme = useTheme();

  const onEnter = () => {
    refEnter.current = setTimeout(
      enter,
      delay.enter || theme.transitions.durations.enteringScreen
    );

    if (refLeave.current) {
      clearTimeout(refLeave.current);
      refLeave.current = null;
    }
  };

  const onLeave = () => {
    refLeave.current = setTimeout(
      leave,
      delay.leave || theme.transitions.durations.leavingScreen
    );

    if (refEnter.current) {
      clearTimeout(refEnter.current);
      refEnter.current = null;
    }
  };

  return ({ onEnter, onLeave });
};
