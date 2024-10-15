const registerResolvers = require("./register");

module.exports = {
  Query: {
    ...registerResolvers.Query,
  },
  Mutation: {
    ...registerResolvers.Mutation,
  },
};
