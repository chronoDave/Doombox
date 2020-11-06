const values = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 1280
};

const axises = {
  x: 'width',
  y: 'height'
};

const directions = {
  up: 'min',
  down: 'max'
};

export default {
  values,
  axises,
  directions,
  create: (direction, value, axis = axises.x) => `@media (${direction}-${axis}: ${value - (direction === directions.down ? 0.01 : 0)}px)`,
  join: (...args) => `@media ${args
    .map(breakpoint => breakpoint.replace(/@media\s/, ''))
    .join(' and ')}`
};
