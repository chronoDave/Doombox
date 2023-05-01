export const binarySearchLeft = <T>(
  arr: T[],
  value: number,
  selector?: (x: T) => number
) => {
  let l = 0;
  let r = arr.length;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if ((selector ? selector(arr[m]) : arr[m]) < value) {
      l = m + 1;
    } else {
      r = m;
    }
  }

  return l;
};

export const binarySearchRight = <T>(
  arr: T[],
  value: number,
  selector?: (x: T) => number
) => {
  let l = 0;
  let r = arr.length;

  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if ((selector ? selector(arr[m]) : arr[m]) > value) {
      r = m;
    } else {
      l = m + 1;
    }
  }

  return r - 1;
};
