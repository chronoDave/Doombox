const keys = {
  sm: 'sm',
  md: 'md',
  lg: 'lg'
};

const values = {
  [keys.sm]: 480,
  [keys.md]: 720,
  [keys.lg]: 1280
};

export default {
  keys,
  values,
  down: key => `@media (max-width: ${values[keys[key]] - 0.01}px)`,
  up: key => `@media (min-width: ${values[keys[key]]}px)`
};
