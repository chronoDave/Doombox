/** Returns array containing cumulative values */
module.exports = (array, initialValue = 0) => {
  const cumulative = [initialValue];

  for (let i = 0; i < array.length; i += 1) {
    cumulative.push(array[i] + cumulative[i]);
  }

  return cumulative;
};
