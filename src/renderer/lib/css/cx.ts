import isObject from '../../../lib/validation/isObject';

const cx = (...args: Array<
  string | undefined | null | boolean | Record<string, boolean>
>): string => args
  .reduce<string[]>((acc, cur) => {
    if (typeof cur === 'string') acc.push(cur);
    if (isObject(cur)) {
      Object.entries(cur).forEach(([key, value]) => {
        if (value) acc.push(key);
      });
    }
    return acc;
  }, [])
  .join(' ');

export default cx;
