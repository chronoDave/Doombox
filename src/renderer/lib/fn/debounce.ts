export default <T extends (...args: any[]) => any>(cb: T) => {
  let id: number;

  return (...args: Parameters<T>) => new Promise<ReturnType<T>>(resolve => {
    if (id) cancelAnimationFrame(id);
    id = requestAnimationFrame(() => resolve(cb(...args)));
  });
};
