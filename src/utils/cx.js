module.exports = (...args) => args
  .filter(x => typeof x === 'string')
  .join(' ');
