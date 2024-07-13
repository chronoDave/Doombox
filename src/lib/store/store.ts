import freeze from '../object/freeze';
import Stack from '../stack/stack';

export type Subscriber<S extends object> = (cur: S, prev: S) => void;
export type Reducer<S extends object> = (state: S) => S;

export default class Store<S extends object> {
  private readonly _subscribers: Set<Subscriber<S>>;
  private readonly _state: Stack<S>;

  get state() {
    /** State is always defined as it's set in constructor */
    return freeze(this._state.peek()!) as S;
  }

  constructor(state: S) {
    this._state = new Stack(2);
    this._subscribers = new Set();

    this._state.push(state);
  }

  set(reducer: Reducer<S>) {
    this._state.push(reducer(this.state));
    this._subscribers.forEach(subscriber => subscriber(
      this.state,
      /** Prev is always defined as 1st state is set in constructor and 2nd state is set in previous statement */
      freeze(this._state.peek(-1)!) as S
    ));

    return this;
  }

  on(subscriber: Subscriber<S>) {
    if (!this._subscribers.has(subscriber)) this._subscribers.add(subscriber);

    return this;
  }

  off(subscriber: Subscriber<S>) {
    this._subscribers.delete(subscriber);

    return this;
  }
}
