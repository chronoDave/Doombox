export const fSparse = <T, K>(arr: T[], cb: (x: T) => K | undefined) =>
  arr.reduce<K[]>((acc, cur) => {
    const value = cb(cur);
    if (value !== undefined) acc.push(value);
    return acc;
  }, []);

export const fUnique = <T, K>(arr: T[], cb: (x: T) => K | undefined) =>
  Array.from(new Set(fSparse(arr, cb)));
