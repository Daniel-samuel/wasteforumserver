const { gql } = require("apollo-server-express");
const Register = gql`
  type Register {
    id: ID!
    name: String
    number: String
    email: String
    role: String
    company: String
  }

  input RegisterInput {
    name: String
    number: String
    email: String
    role: String
    company: String
  }

  input LoginInput {
    email: String!
    number: String!
  }

  type AuthPayload {
    token: String
    user: Register
  }

  type Commitment {
    id: ID!
    register: Register!
    message: String!
    committedAt: String!
  }

  input CommitInput {
    register: ID!
    message: String!
  }

  type Query {
    GetRegisterByRole(role: String!): [Register]
    listRegisters: [Register]
    getCommitmentById(id: ID!): Commitment
    getCommitmentsByRegister(register: ID!): [Commitment!]!
  }

  type Mutation {
    CreateRegister(input: RegisterInput!): Register
    CreateCommitment(input: CommitInput!): Commitment
    Login(input: LoginInput!): AuthPayload
  }
`;
module.exports = Register;
