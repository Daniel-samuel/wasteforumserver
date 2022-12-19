const messageResolvers = require("./message");
const hospitalResolvers = require("./hospital");
const patientResolvers = require("./patient");
const postResolvers = require("./post");
const turbomedResolvers = require("./turbomed");
const hospitalAdminResolvers = require("./hospitalAdminLogin");
const generalinfoResolvers = require("./generalinfo");

module.exports = {
  Query: {
    ...messageResolvers.Query,
    ...hospitalResolvers.Query,
    ...patientResolvers.Query,
    ...postResolvers.Query,
    ...turbomedResolvers.Query,
    ...hospitalAdminResolvers.Query,
    ...generalinfoResolvers.Query,
  },
  Mutation: {
    ...messageResolvers.Mutation,
    ...hospitalResolvers.Mutation,
    ...patientResolvers.Mutation,
    ...postResolvers.Mutation,
    ...turbomedResolvers.Mutation,
    ...hospitalAdminResolvers.Mutation,
    ...generalinfoResolvers.Mutation,
  },
};
