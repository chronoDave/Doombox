export type Constrain<P, T extends { [K in string]: P }> = T;
export type ValueOf<T extends Record<string, string>> = T[keyof T];
