/**
 * @param {Array[]} values - Array of values to be tested, in `[key, value]` format
 */
const validateValues = values => Promise.all(values
  .map(([key, value]) => {
    if (!value) return Promise.reject(new Error(`No ${key} provided: ${value}`));
    return Promise.resolve();
  }));

module.exports = {
  validateValues
};
