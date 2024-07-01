export default <T extends (...args: any[]) => any>(fn: T, n?: number) => {
  let id: number;

  if (typeof requestAnimationFrame !== 'undefined') {
    return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
      if (id) cancelAnimationFrame(id);
      id = requestAnimationFrame(() => resolve(fn(...args)));
    });
  }

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) clearTimeout(id);
    id = setTimeout(() => resolve(fn(...args)), n) as unknown as number;
  });
};
