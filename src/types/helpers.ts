export type Constrain<P, T extends { [K in string]: P }> = T;
export type ValueOf<T extends Record<string, string>> = T[keyof T];

export type NestedKeyOf<ObjectType extends object> =
  { [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    // @ts-ignore: TS2589 - Type instantiation is excessively deep and possibly infinite.
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];
