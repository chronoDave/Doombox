export const sum = <T extends number>(arr: T[]) =>
  arr.reduce((acc, cur) => acc + cur, 0);

export const sumSelect = <T>(arr: T[], select: (cur: T) => number) =>
  arr.reduce((acc, cur) => acc + select(cur), 0);
