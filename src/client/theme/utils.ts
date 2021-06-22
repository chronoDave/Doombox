export const unit = (n = 1) => n * 8;
export const toPx = (n = 1) => `${unit(n)}px`;
export const pxToRem = (px: number) => `${px / 16}rem`;
export const spacing = (...args: number[]) => args.length === 0 ?
  toPx() :
  args.map(toPx).join(' ');
