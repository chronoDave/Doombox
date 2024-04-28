/** Random integer, inclusive */
export default (min: number, max: number) => {
  const x = Math.ceil(min);
  const y = Math.floor(max);

  return Math.floor(Math.random() * (y - x + 1) + x);
};
