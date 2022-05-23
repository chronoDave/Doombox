const unit = (n = 1) => n * 8;
const toPx = (n = 1) => `${unit(n)}px`;

export default ({
  unit: (n = 1) => n * 8,
  toPx,
  pxToRem: px => `${px / 16}rem`,
  spacing: (...args) => (args.length === 0 ? toPx() : args.map(toPx).join(' ')),
  createImage: (src, opacity = 0.42) => [
    `linear-gradient(rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity}))`,
    `url("${src}")`
  ].join(','),
  border: (color, width = 1, style = 'solid') => `${width}px ${style} ${color}`
});