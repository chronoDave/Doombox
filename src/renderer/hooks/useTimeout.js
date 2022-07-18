import { useRef, useEffect, useCallback } from 'react';

export default (fn, delay = 150) => {
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
