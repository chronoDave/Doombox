export default class EventEmitter {
  private readonly _listeners: Record<string, Function[]>;

  constructor() {
    this._listeners = {};
  }

  on(event: string, cb: Function) {
    if (!Array.isArray(this._listeners[event])) this._listeners[event] = [];
    this._listeners[event].push(cb);
  }

  once(event: string, cb: Function) {
    const wrapper = () => {
      cb();
      this.remove(event, wrapper);
    };

    this.on(event, wrapper);
  }

  emit(event: string) {
    this._listeners[event]?.forEach(listener => listener());
  }

  remove(event: string, cb: Function) {
    if (!Array.isArray(this._listeners[event])) return;

    const i = this._listeners[event].findIndex(listener => listener === cb);
    if (i >= 0) this._listeners[event].splice(i, 1);
  }

  destroy(event: string) {
    this._listeners[event] = [];
  }
}
