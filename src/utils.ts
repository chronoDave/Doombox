export const capitalize = (x: string) => `${x[0].toLocaleUpperCase()}${x.slice(1)}`;
export const getTimestampDate = () => {
  const now = new Date();

  const y = now.getFullYear();
  const m = `${now.getUTCMonth() + 1}`.padStart(2, '0');
  const d = now.getUTCDate();

  return `${y}-${m}-${d}`;
};
export const getTimestampMs = () => {
  const now = new Date();

  const h = `${now.getHours()}`.padStart(2, '0');
  const m = `${now.getMinutes()}`.padStart(2, '0');
  const s = `${now.getSeconds()}`.padStart(2, '0');
  const ms = `${now.getMilliseconds()}`.padStart(3, '0');

  return `${h}:${m}:${s}.${ms}`;
};
