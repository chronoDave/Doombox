export default class EventEmitter<T extends string> {
  private readonly _listeners: Map<T, Function[]>;

  constructor() {
    this._listeners = new Map();
  }

  on<K>(event: T, cb: (payload?: K) => void) {
    if (!this._listeners.has(event)) this._listeners.set(event, []);
    this._listeners.get(event)?.push(cb);
  }

  once<K>(event: T, cb: (payload?: K) => void) {
    const wrapper = (payload?: K) => {
      cb(payload);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }

  emit(event: T, payload?: unknown) {
    this._listeners.get(event)?.forEach(listener => listener(payload));
  }

  off(event: T, cb: Function) {
    const listeners = this._listeners.get(event);

    if (!listeners) return;
    const i = listeners.findIndex(listener => listener === cb);
    if (i >= 0) listeners.splice(i, 1);
  }

  destroy(event: T) {
    this._listeners.set(event, []);
  }
}
