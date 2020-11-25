const capitalize = require('./capitalize');

module.exports = (string, separator) => string
  .split(separator)
  .map(capitalize)
  .join(separator);
