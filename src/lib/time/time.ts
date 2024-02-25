export default class Time {
  private readonly _s: number;
  private readonly _m: number;
  private readonly _h: number;

  /**
   * @param n Time in seconds
   */
  constructor(n: number) {
    this._s = Math.floor(n % 60);
    this._m = Math.floor(n / 60) % 60;
    this._h = Math.floor(n / 3600);
  }

  toLong() {
    const h = this._h > 0 && `${this._h}h`;
    const m = `${this._m}m`;
    const s = `${this._s}s`;

    return h ?
      `${h} ${m} ${s}` :
      `${m} ${s}`;
  }

  toShort(options?: { minify?: boolean }) {
    const pad = (n: number) => `${n}`.padStart(2, '0');

    const h = (options?.minify === false || this._h > 0) && pad(this._h);
    const m = pad(this._m);
    const s = pad(this._s);

    return h ?
      `${h}:${m}:${s}` :
      `${m}:${s}`;
  }
}
