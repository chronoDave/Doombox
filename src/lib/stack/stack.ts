import wrap from '../math/wrap';

export default class Stack<T> {
  private readonly _stack: Map<number, T | null>;
  private readonly _size: number;
  private _index: number;

  get size() {
    return Array.from(this._stack.values()).filter(x => x !== null).length;
  }

  constructor(n: number) {
    this._stack = new Map();
    this._size = n;
    this._index = 0;
  }

  /**
   * @param i Relative index
   */
  peek(i?: number): T | null {
    if (!i) return this._stack.get(wrap(0, this._size - 1, this._index - 1)) ?? null;
    return this._stack.get(wrap(0, this._size - 1, this._index - (1 + i))) ?? null;
  }

  push(x: T) {
    this._stack.set(this._index, x);
    this._index = wrap(0, this._size - 1, this._index + 1);

    return this;
  }

  pop() {
    this._index = wrap(0, this._size - 1, this._index - 1);
    this._stack.set(this._index, null);

    return this;
  }
}
