export const binarySearchRight = <T>(
  arr: T[],
  value: number,
  map: (x: T) => number
) => {
  let l = 0;
  let r = arr.length;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (map(arr[m]) > value) {
      r = m;
    } else {
      l = m + 1;
    }
  }

  return r - 1;
};
