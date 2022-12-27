export const intRandom = (min: number, max: number) => {
  const cMin = Math.ceil(min);
  const cMax = Math.floor(max);

  return Math.floor(Math.random() * (cMax - cMin) + cMin);
};
