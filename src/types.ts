export type ValueOf<T> = T[keyof T];
export type JSON = string | number | boolean | { [key: string]: JSON } | JSON[];
