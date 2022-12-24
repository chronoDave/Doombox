export const mergeUnique = <T>(ax: readonly T[], ay: readonly T[]) =>
  Array.from(new Set([...ax, ...ay]));
