// import _ from "lodash";
const _ = require("lodash");

const Scalars = require("./Scalars");
const Auth = require("./Auth");
const Hospital = require("./Hospital");
const Post = require("./Post");
const Patient = require("./Patient");
const Turbomed = require("./Turbomed");
const Generalinfo = require("./Generalinfo");
const Doctor = require("./Doctor");

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

module.exports = typeDefs = [
  Root,
  Scalars.typeDefs,
  Auth,
  Hospital,
  Post,
  Patient,
  Turbomed,
  Generalinfo,
  Doctor,
];
