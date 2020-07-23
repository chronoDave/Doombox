const glob = require('glob');

const globPromise = (pattern, options) => new Promise((resolve, reject) => glob(
  pattern,
  options,
  (err, matches) => {
    if (err) return reject(err);
    return resolve(matches);
  }
));

module.exports = {
  globPromise
};
