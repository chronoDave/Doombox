export const capitalize = (x: string) => `${x[0].toLocaleUpperCase()}${x.slice(1)}`;
export const cx = (...args: Array<string | undefined | boolean>) => args
  .filter(className => className)
  .join(' ');
