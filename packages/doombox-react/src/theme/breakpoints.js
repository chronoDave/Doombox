const keys = {
  small: 'small',
  medium: 'medium',
  large: 'large'
};

const values = {
  [keys.small]: 480,
  [keys.medium]: 720,
  [keys.large]: 1280
};

const up = key => `@media (min-width:${values[key]}px)`;
const down = key => `@media (max-width:${values[key]}px)`;

export default {
  keys,
  values,
  up,
  down
};
