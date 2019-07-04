module.exports = {
  events: {
    events: () => {
      return ['Event A', 'Event B', 'Event C'];
    },
    createEvent: args => {
      const { name } = args;

      return name;
    }
  }
};
