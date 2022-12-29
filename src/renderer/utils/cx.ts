import isObject from '../../utils/validation/isObject';

const cx = (...args: unknown[]): string => {
  if (!Array.isArray(args)) return cx([args]);
  return args
    .reduce((acc, cur) => {
      if (typeof cur === 'string') acc.push(cur);
      if (isObject(cur)) {
        Object.entries(cur).forEach(([key, value]) => {
          if (value) acc.push(key);
        });
      }
      return acc;
    }, [])
    .join(' ');
};

export default cx;
