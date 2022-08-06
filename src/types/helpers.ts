export type Constrain<P, T extends { [K in string]: P }> = T;
export type Enum<T extends string> = { [K in T]: K };
