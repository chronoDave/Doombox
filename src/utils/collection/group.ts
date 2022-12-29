export default <T extends Record<string, unknown>>(arr: T[], key: keyof T) => arr
  .reduce<Record<string, T[]>>((acc, cur) => {
    if (key in cur) {
      // @ts-expect-error
      if (!acc[key]) acc[cur[key]] = [];
      // @ts-expect-error
      acc[cur[key]].push(cur);
    }

    return acc;
  }, {});
