export default <T extends (...args: any[]) => any>(cb: T, n: number) => {
  let id: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) clearTimeout(id);
    id = setTimeout(() => resolve(cb(...args)), n);
  });
};
