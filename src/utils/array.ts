export const toArray = <T>(x: T) =>
  (Array.isArray(x) ? x : [x]);

// Fisher–Yates shuffle
export const shuffle = <T>(x: T[]) => {
  const arr = x;

  for (let i = x.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * i);
    const t = arr[i];
    arr[i] = arr[r];
    arr[r] = t;
  }

  return arr;
};
