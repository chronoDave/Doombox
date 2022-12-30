/** Set difference `A \ B`. */
export default <T>(a: readonly T[], b: readonly T[]) =>
  a.filter(x => !b.includes(x));
