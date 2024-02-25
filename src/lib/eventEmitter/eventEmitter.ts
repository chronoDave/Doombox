export default class EventEmitter<T extends Record<string, (payload: any) => void>> {
  private readonly _events: Map<keyof T, Set<T[keyof T]>>;

  constructor() {
    this._events = new Map();
  }

  on<K extends keyof T>(event: K, listener: T[K]) {
    if (!this._events.has(event)) this._events.set(event, new Set());
    this._events.get(event)?.add(listener);

    return this;
  }

  off<K extends keyof T>(event: K, listener: T[K]) {
    this._events.get(event)?.delete(listener);

    return this;
  }

  emit<K extends keyof T>(event: K, payload?: Parameters<T[K]>[0]) {
    this._events.get(event)?.forEach(listener => listener(payload));

    return this;
  }
}
