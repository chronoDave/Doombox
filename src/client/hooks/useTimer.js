import {
  useState,
  useRef,
  useCallback,
  useEffect
} from 'react';

export default position => {
  const [current, setCurrent] = useState(0);

  const ms = useRef(0);
  const timer = useRef();

  const destroy = useCallback(() => timer.current && clearInterval(timer.current), []);
  const create = useCallback(() => {
    destroy();
    timer.current = setInterval(() => {
      ms.current += 1;
      setCurrent(ms.current);
    }, 1000);
  }, [destroy]);

  useEffect(() => {
    ms.current = Math.round(position);
    setCurrent(ms.current);
  }, [position]);

  useEffect(() => destroy, [destroy]);

  return [current, create, destroy];
};
