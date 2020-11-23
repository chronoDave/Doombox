/**
 * Add zero padding
 * @param {number} n
 * @param {number} d - Padding depth (default `1`)
 */
module.exports = (n, d = 1) => `${'0'.repeat(Math.max(d - n.toString().length, 0))}${n}`;
