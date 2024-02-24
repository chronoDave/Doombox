/** Set difference `A \ B`. */
export default <T>(a: T[], b: T[]) =>
  a.filter(x => !b.includes(x));
