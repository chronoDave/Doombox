import produce from 'immer';

export const toArray = <T>(x: T) =>
  (Array.isArray(x) ? x : [x]);

export const fill = <T>(n: number, x: (i: number) => T) =>
  Array.from({ length: n }).map((_, i) => x(i));

/** Fisher-Yates shuffle */
export const shuffle = <T>(x: T[]) => produce(x, draft => {
  for (let i = draft.length - 1; i > 0; i -= 1) {
    const r = Math.floor(Math.random() * i);
    const t = draft[i];
    draft[i] = draft[r];
    draft[r] = t;
  }

  return draft;
});

/** Round-robin split */
export const splitRr = <T>(x: T[], n: number): T[][] => {
  const slices = fill<T[]>(n, () => []);

  for (let i = 0; i < x.length; i += 1) {
    slices[i % n].push(x[i]); // Round-robin
  }

  return slices;
};
