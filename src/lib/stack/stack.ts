import wrap from '../math/wrap';

export default class Stack<T> {
  private readonly _arr: Array<T | null>;
  private _i: number;

  get size() {
    return this._arr.filter(x => x !== null).length;
  }

  constructor(size: number) {
    this._arr = Array(size).fill(null);
    this._i = -1;
  }

  push(x: T) {
    this._i = wrap(0, this._arr.length - 1, this._i + 1);
    this._arr[this._i] = x;

    return this;
  }

  pop() {
    this._arr[this._i] = null;
    this._i = wrap(0, this._arr.length - 1, this._i - 1);

    return this;
  }

  peek(i: number) {
    if (i >= this._arr.length) return null;
    return this._arr[i];
  }
}
