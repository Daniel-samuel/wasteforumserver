const messageResolvers = require("./message");
const hospitalResolvers = require("./hospital");
const patientResolvers = require("./patient");
const postResolvers = require("./post");
const turbomedResolvers = require("./turbomed");
const hospitalAdminResolvers = require("./hospitalAdminLogin");

module.exports = {
  Query: {
    ...messageResolvers.Query,
    ...hospitalResolvers.Query,
    ...patientResolvers.Query,
    ...postResolvers.Query,
    ...turbomedResolvers.Query,
    ...hospitalAdminResolvers.Query,
  },
  Mutation: {
    ...messageResolvers.Mutation,
    ...hospitalResolvers.Mutation,
    ...patientResolvers.Mutation,
    ...postResolvers.Mutation,
    ...turbomedResolvers.Mutation,
    ...hospitalAdminResolvers.Mutation
  },
};
