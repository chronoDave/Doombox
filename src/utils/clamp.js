/**
 * Clamp `n` between `min` and `max`
 * @param {number} min
 * @param {number} max
 * @param {number} n
 */
module.exports = (min, max, n) => Math.min(Math.max(n, min), max);
