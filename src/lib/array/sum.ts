export default <T>(arr: T[], selector: (cur: T) => number) =>
  arr.reduce((acc, cur) => acc + selector(cur), 0);
