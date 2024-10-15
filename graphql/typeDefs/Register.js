const { gql } = require("apollo-server-express");
const Register = gql`
  type Register {
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

  type Query {
    getRegisterByRole(role: String!): [Register]
    listRegisters: [Register]
  }

  type Mutation {
    createRegister(input: RegisterInput!): Register
  }
`;
module.exports = Register;
