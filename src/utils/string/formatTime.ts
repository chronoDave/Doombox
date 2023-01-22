const format = (ms: number): [h: number, m: number, s: number] => {
  const s = Math.floor((ms % 3600) % 60);
  const m = Math.floor((ms % 3600) / 60);
  const h = Math.floor(ms / 3600);

  return [h, m, s];
};

export const formatTimeNumber = (ms: number, units: number) => format(ms)
  .slice(3 - units)
  .map(x => `${x}`.padStart(2, '0'))
  .join(':');
