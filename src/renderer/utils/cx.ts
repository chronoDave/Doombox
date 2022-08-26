export default (...args: unknown[]) => args
  .filter(x => typeof x === 'string')
  .join(' ');
