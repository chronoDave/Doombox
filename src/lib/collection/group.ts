export default <T extends object, K extends keyof T>(arr: T[], k: K): Map<T[K], T[]> => {
  const group = new Map<T[K], T[]>();

  arr.forEach(x => {
    if (!group.has(x[k])) group.set(x[k], []);
    group.get(x[k])?.push(x);
  });

  return group;
};
