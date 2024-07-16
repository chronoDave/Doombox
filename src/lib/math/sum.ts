export default <T extends number>(arr: T[]) =>
  arr.reduce((acc, cur) => acc + cur, 0);
