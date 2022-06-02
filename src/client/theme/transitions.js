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
  leavingScreen: 195
};

export default {
  easings,
  durations,
  create: (props, options = {}) => {
    const duration = durations[options.duration] || options.duration || durations.shortest;
    const easing = easings[options.easing] || options.easing || easings.easeInOut;
    const delay = options.delay || 0;

    return props
      .map(prop => `${prop} ${duration}ms ${easing} ${delay}ms`)
      .join(',');
  }
};
