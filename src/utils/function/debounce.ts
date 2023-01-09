export const debounce = <T extends (...args: any[]) => any>(fn: T, n: number) => {
  let id: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) clearTimeout(id);
    id = setTimeout(() => resolve(fn(...args)), n);
  });
};

export const debounceFrame = <T extends (...args: any[]) => any>(fn: T) => {
  let id: number;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) cancelAnimationFrame(id);
    id = requestAnimationFrame(() => resolve(fn(...args)));
  });
};
