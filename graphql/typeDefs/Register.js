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
    name: String!
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
    getRegisterByRole(role: String!): [Register]
    listRegisters: [Register]
    getCommitmentById(id: ID!): Commitment
    getCommitmentsByRegister(register: ID!): [Commitment!]!
  }

  type Mutation {
    createRegister(input: RegisterInput!): Register
    createCommitment(input: CommitInput!): Commitment
    login(input: LoginInput!): AuthPayload
  }
`;
module.exports = Register;
