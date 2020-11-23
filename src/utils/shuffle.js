/**
 * Shuffle array
 * @param {array} array
 * */
module.exports = array => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = shuffled[j];
      shuffled[j] = shuffled[i];
      shuffled[i] = swap;
    }
    if (
      shuffled.length <= 1 ||
      shuffled.some((v, i) => v !== array[i])
    ) return shuffled;
  }
};
