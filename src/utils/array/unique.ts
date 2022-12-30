export default <T>(a: readonly T[], b: readonly T[]) =>
  Array.from(new Set([...a, ...b]));
