const join = (arr: number[]) => arr
  .map(x => `${x}`.padStart(2, '0'))
  .join(':');

export const toSec = (x: number) => Math.floor(x % 60);
export const toMin = (x: number) => Math.floor((x / 60) % 60);
export const toHour = (x: number) => Math.floor((x / 60 / 60) % 60);

export const toMinSec = (x: number) =>
  join([toMin(x), toSec(x)]);

export const toHourMinSec = (x: number) =>
  join([toHour(x), toMin(x), toSec(x)]);
