export const capitalize = (x: string) => `${x[0].toLocaleUpperCase()}${x.slice(1)}`;
export const getTimestamp = () => {
  const now = new Date();

  return [
    now.getFullYear(),
    `${now.getUTCMonth() + 1}`.padStart(2, '0'),
    now.getUTCDate()
  ].join('-');
};
