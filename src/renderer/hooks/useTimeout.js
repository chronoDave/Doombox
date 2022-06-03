import { useRef, useEffect, useCallback } from 'react';

// Theme
import { transitions } from '../theme';

export default (fn, delay = transitions.durations.shortest) => {
  const timeout = useRef();

  const destroy = useCallback(() => (
    timeout.current && clearTimeout(timeout.current)
  ), []);
  const create = useCallback(() => {
    destroy();
    timeout.current = setTimeout(fn, delay);
  }, [destroy, fn, delay]);

  useEffect(() => destroy, [destroy]);

  return [create, destroy];
};
