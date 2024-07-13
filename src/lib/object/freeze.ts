export type Frozen<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? Frozen<T[K]> : Readonly<T[K]>
};

const freeze = <T extends NonNullable<object>>(o: T): Frozen<T> => {
  const keys = Reflect.ownKeys(o);

  for (const k in keys) {
    if (Object.prototype.hasOwnProperty.call(o, k)) {
      const x = o[k as keyof T];
      if (x && (typeof x === 'object' || typeof x === 'function')) freeze(x as any as object);
    }
  }

  return Object.freeze(o);
};

export default freeze;
