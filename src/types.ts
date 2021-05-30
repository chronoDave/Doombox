export type ValueOf<T> = T[keyof T];
export type JSON = string | number | boolean | { [key: string]: JSON } | JSON[];

export interface Cache {
  window: {
    x?: number
    y?: number
    width?: number
    height?: number
  },
  test: {
    value: string
  }
}

export interface UserTheme {
  dark: boolean
}
