export const debounce = <T extends (...args: any[]) => any>(cb: T, n: number) => {
  let id: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) clearTimeout(id);
    id = setTimeout(() => resolve(cb(...args)), n);
  });
};

export const debounceFrame = <T extends (...args: any[]) => any>(cb: T) => {
  let id: number;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) cancelAnimationFrame(id);
    id = requestAnimationFrame(() => resolve(cb(...args)));
  });
};
