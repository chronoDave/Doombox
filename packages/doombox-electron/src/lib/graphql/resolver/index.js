const Event = require('../../mongoose/models/event');
const User = require('../../mongoose/models/user');

module.exports = {
  events: {
    events: () => Event.find()
      .populate('creator')
      .then(events => events)
      .catch(err => { throw err; }),
    createEvent: args => {
      const event = new Event({
        ...args.input,
        date: new Date(args.input.date),
        creator: '5d1e4be67d5f8f0b14ba2bfb'
      });

      return event.save()
        .catch(err => { throw err; });
    },
    createUser: args => {
      User.findOne({ username: args.input.username })
        .then(doc => {
          if (doc) {
            throw new Error('Username already exists');
          }
          const user = new User({ ...args.input });

          return user.save()
            .catch(err => { throw err; });
        });
    }
  }
};
