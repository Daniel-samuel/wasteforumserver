// import _ from "lodash";
const _ = require("lodash");

const Scalars = require("./Scalars");

const Register = require("./Register");
const Root = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

module.exports = typeDefs = [Root, Scalars.typeDefs, Register];
