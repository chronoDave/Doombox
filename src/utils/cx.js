module.exports = (...args) => args
  .filter(x => typeof x === 'string' && x.length > 0)
  .join(' ');
