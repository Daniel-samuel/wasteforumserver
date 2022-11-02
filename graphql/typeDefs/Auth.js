const Auth = `
  type Message {
    text: String
    createdAt: String
    createdBy: String
  }

  type User {
    username: String
    email: String
    token: String
  }

  enum UserTypeEnum {
      PATIENT
      HOSPITALADMIN
      DOCTOR
      AGENT
      TURBOMEDADMIN
  }
  input MessageInput {
    text: String
    username: String
  }
  input RegisterInput {
    username: String
    email: String
    password: String
    accountType: UserTypeEnum
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    message(id: ID!): Message
    user(id: ID!): User
  }
  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(input: RegisterInput): User
    loginUser(input: LoginInput): User
  }
`;

module.exports = Auth;
