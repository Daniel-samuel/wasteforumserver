// import _ from "lodash";
const _ = require("lodash");

const Scalars = require("./Scalars");
const Auth = require("./Auth");
const Hospital = require("./Hospital");
const Post = require("./Post");

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

module.exports = typeDefs = [Root, Scalars.typeDefs, Auth, Hospital, Post];
