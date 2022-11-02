const messageResolvers = require("./message");
const hospitalResolvers = require("./hospital");
const patientResolvers = require("./patient");
const postResolvers = require("./post");

module.exports = {
  Query: {
    ...messageResolvers.Query,
    ...hospitalResolvers.Query,
    ...patientResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...messageResolvers.Mutation,
    ...hospitalResolvers.Mutation,
    ...patientResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
