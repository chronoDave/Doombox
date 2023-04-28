export default <T extends Record<PropertyKey, any>>(arr: T[], key: keyof T) => arr
  .reduce<Record<PropertyKey, T[]>>((acc, cur) => {
    (acc[cur[key]] ||= []).push(cur);
    return acc;
  }, {});
