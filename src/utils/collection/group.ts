export default <T extends Record<PropertyKey, unknown>>(arr: T[], key: keyof T) => arr
  .reduce<Record<PropertyKey, T[]>>((acc, cur) => {
    if (key in cur) {
      const group = cur[key];
      if (typeof group !== 'string') throw new Error('Group must be of type string');

      if (!acc[key]) acc[group] = [];
      acc[group].push(cur);
    }

    return acc;
  }, {});
