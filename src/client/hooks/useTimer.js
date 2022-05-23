import {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react';

export default () => {
  const [current, setCurrent] = useState(0);

  const ms = useRef(0);
  const timer = useRef();

  const destroy = useCallback(() => {
    ms.current = 0;
    if (timer.current) clearInterval(timer.current);
  }, []);

  const create = useCallback(() => {
    destroy();
    timer.current = setInterval(() => {
      ms.current += 1;
      setCurrent(ms.current);
    }, 1000);
  }, [destroy]);

  const update = useCallback(position => {
    ms.current = Math.round(position);
    setCurrent(position);
  }, []);

  useEffect(() => destroy, [destroy]);

  return [current, { create, update, destroy }];
};