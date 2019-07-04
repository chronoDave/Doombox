const { buildSchema } = require('graphql');

module.exports = {
  schema: buildSchema(`
    type RootQuery {
      events: [String!]
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)
};
