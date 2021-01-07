import { useRef } from 'react';

// Theme
import { transitions } from '../theme';

export default (fn, delay = transitions.durations.shortest) => {
  const timeout = useRef();

  const destroy = () => timeout.current && clearTimeout(timeout.current);
  const create = () => {
    destroy();
    timeout.current = setTimeout(fn, delay);
  };

  return [create, destroy];
};
