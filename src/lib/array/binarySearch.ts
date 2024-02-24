export const binarySearchLeft = <T>(
  arr: T[],
  value: (x: T) => number,
  get?: (x: T) => number
) => {
  let l = 0;
  let r = arr.length;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    const x = get?.(arr[m]) ?? arr[m];

    if (x < value(arr[m])) {
      l = m + 1;
    } else {
      r = m;
    }
  }

  return l;
};

export const binarySearchRight = <T>(
  arr: T[],
  value: (x: T) => number,
  get?: (x: T) => number
) => {
  let l = 0;
  let r = arr.length;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    const x = get?.(arr[m]) ?? arr[m];

    if (x > value(arr[m])) {
      r = m;
    } else {
      l = m + 1;
    }
  }

  return r - 1;
};
