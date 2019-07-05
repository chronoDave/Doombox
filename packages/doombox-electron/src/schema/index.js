const { buildSchema } = require('graphql');

module.exports = {
  schema: buildSchema(`
    type Image {
      _id: ID!
      file_name: String!
      file_type: String!
      url: String!
    }

    type User {
      _id: ID!
      username: String!
      avatar: Image
    }

    input UserInput {
      username: String!
      avatar: ID
    }

    input ImageInput {
      file_name: String!
      file_type: String!
      url: String!
    }

    type RootQuery {
      users: [User!]!
    }

    type RootMutation {
      createUser(input: UserInput): User
      createImage(input: ImageInput): Image
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)
};
