export default <T>(n: number, cb: (i: number, arr: T[]) => T): T[] => {
  const arr = Array.from<T>({ length: n });
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = cb(i, arr);
  }

  return arr;
};
