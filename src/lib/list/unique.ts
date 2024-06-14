export default <T>(a: T[]) => (b: T[]) =>
  Array.from(new Set([...a, ...b]));
