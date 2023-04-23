export default class Observer<T extends Record<string, (payload: any) => void>> {
  private readonly _listeners: Map<keyof T, Array<{ listener: T[keyof T], once?: boolean }>>;

  protected _emit<K extends keyof T>(event: K, payload: Parameters<T[K]>[0]) {
    this._listeners.get(event)?.forEach(({ listener, once }) => {
      listener(payload);
      if (once) this.off(event, listener);
    });

    return this;
  }

  constructor() {
    this._listeners = new Map();
  }

  off<K extends keyof T>(event: K, cb: T[K]) {
    const listeners = this._listeners.get(event);
    if (!listeners || listeners.length === 0) return this;

    const i = listeners.findIndex(({ listener }) => listener === cb);
    if (i >= 0) listeners.splice(i, 1);

    return this;
  }

  on<K extends keyof T>(event: K, cb: T[K], options?: { once?: boolean }) {
    if (!this._listeners.has(event)) this._listeners.set(event, []);
    this._listeners.get(event)?.push({ listener: cb, once: options?.once });

    return this;
  }
}
