const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
};

const durations = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
};

export default {
  easings,
  durations,
  create: (props, options) => {
    const {
      duration = 'standard',
      easing = 'easeInOut',
      delay = 0
    } = options;

    if (process.env.NODE_ENV === 'development') {
      const createError = (type, expected, actual) => {
        console.error(
          `Invalid breakpoint ${type} \`${expected}\`, expected one of: ${Object.keys(actual).join(', ')}`,
          `\n${new Error().stack.match(/\(.*\)/g)[2]}`
        );
      };

      if (!durations[duration]) createError('duration', duration, durations);
      if (!easings[easing]) createError('value', easing, easings);
    }

    return props
      .map(prop => `${prop} ${durations[duration]}ms ${easings[easing]} ${delay}ms`)
      .join(',');
  }
};
