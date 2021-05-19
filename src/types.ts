export type ValueOf<T> = T[keyof T];
export type KeyOfString<T> = Extract<keyof T, string>;
