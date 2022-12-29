export default <T>(ax: readonly T[], ay: readonly T[]) =>
  Array.from(new Set([...ax, ...ay]));
