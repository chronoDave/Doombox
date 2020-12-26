const crypto = require('crypto');

/**
 * Generate unique ID based on seed
 * @param {string} seed
 */
module.exports = (seed = crypto.randomBytes(20)) => crypto
  .createHash('md5')
  .update(seed)
  .digest('hex');
