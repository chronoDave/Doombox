export const clamp = (min: number, max: number, n: number) =>
  Math.min(Math.max(n, min), max);

export const sum = (x: number[]) =>
  x.reduce((acc, cur) => acc + cur, 0);
