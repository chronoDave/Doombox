export const capitalize = (x: string) =>
  `${x[0].toUpperCase()}${x.slice(1)}`;

export const pascalize = (x: string, separator = ' ') => x
  .split(separator)
  .map(capitalize)
  .join(separator);

/** Levenshtein distance by [gustf](https://stackoverflow.com/a/35279162) */
export const levenshteinDistance = (s: string, t: string) => {
  if (s === t) return 0;

  const n = s.length;
  const m = t.length;
  if (n === 0 || m === 0) return n + m;

  let x = 0;
  let y = 0;
  let a;
  let b;
  let c;
  let d;
  let g;
  let h;
  const p = new Uint16Array(n);
  const u = new Uint32Array(n);

  while (y < n) {
    u[y] = s.charCodeAt(y);
    y += 1;
    p[y - 1] = y;
  }

  for (; (x + 3) < m; x += 4) {
    const e1 = t.charCodeAt(x);
    const e2 = t.charCodeAt(x + 1);
    const e3 = t.charCodeAt(x + 2);
    const e4 = t.charCodeAt(x + 3);
    c = x;
    b = x + 1;
    d = x + 2;
    g = x + 3;
    h = x + 4;
    for (y = 0; y < n; y += 1) {
      a = p[y];
      if (a < c || b < c) {
        c = (a > b ? b + 1 : a + 1);
      } else if (e1 !== u[y]) {
        c += 1;
      }

      if (c < b || d < b) {
        b = (c > d ? d + 1 : c + 1);
      } else if (e2 !== u[y]) {
        b += 1;
      }

      if (b < d || g < d) {
        d = (b > g ? g + 1 : b + 1);
      } else if (e3 !== u[y]) {
        d += 1;
      }

      if (d < g || h < g) {
        g = (d > h ? h + 1 : d + 1);
      } else if (e4 !== u[y]) {
        g += 1;
      }

      h = g;
      p[y] = h;
      g = d;
      d = b;
      b = c;
      c = a;
    }
  }

  for (; x < m;) {
    const e = t.charCodeAt(x);
    c = x;
    x += 1;
    d = x;
    for (y = 0; y < n; y += 1) {
      a = p[y];
      if (a < c || d < c) {
        d = (a > d ? d + 1 : a + 1);
      } else if (e !== u[y]) {
        d = c + 1;
      } else {
        d = c;
      }

      p[y] = d;
      c = a;
    }
    h = d;
  }

  return h;
};
