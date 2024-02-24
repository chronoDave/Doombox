export default (min: number, max: number, n: number) => {
  if (n < min) return max;
  if (n > max) return min;
  return n;
};
