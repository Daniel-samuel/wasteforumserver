const messageResolvers = require("./message");
const usersResolvers = require("./user");
const hospitalResolvers = require("./hospital");

module.exports = {
  Query: {
    ...messageResolvers.Query,
    ...usersResolvers.Query,
    ...hospitalResolvers.Query,
  },
  Mutation: {
    ...messageResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...hospitalResolvers.Mutation,
  },
};
