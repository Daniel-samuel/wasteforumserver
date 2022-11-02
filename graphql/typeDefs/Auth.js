const Auth = `
  type Message {
    text: String
    createdAt: String
    createdBy: String
  }

  type User {
    username: String
    email: String
    password: String
    token: String
  }

  enum UserTypeEnum {
      PATIENT
      HOSPITALADMIN
      DOCTOR
      AGENT
      TURBOADMIN
  }
  input MessageInput {
    text: String
    username: String
  }
  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
    userType: UserTypeEnum
  }

  type Query {
    message(id: ID!): Message
    user(id: ID!): User
  }
  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;

module.exports = Auth;
