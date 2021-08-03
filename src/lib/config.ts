export interface Cache {
  window: {
    x?: number
    y?: number
    width?: number
    height?: number
  },
  player: {
    muted: boolean,
    volume: number
  }
}
