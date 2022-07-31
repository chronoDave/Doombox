export const debounce = <T extends (...args: any[]) => any>(fn: T, n: number) => {
  let id: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) clearTimeout(id);
    id = setTimeout(() => resolve(fn(...args)), n);
  });
};
