const { buildSchema } = require('graphql');

module.exports = {
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type User {
      _id: ID!
      username: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      username: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(input: EventInput): Event
      createUser(input: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)
};
