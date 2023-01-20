const User = require("../../models/User");
const General = require("../../models/Generalinfo");
const { ApolloError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const JWT = require("../../helpers/jwt");
module.exports = {
  Mutation: {
    async loginDoctor(_, { input }) {
      const doctor = await User.Doctor.findOne({
        email: input.email,
      });
      if (!doctor) {
        throw new ApolloError("Email does not exist!", "EMAIL_NOT_FOUND");
      }
      const isMatch = await bcrypt.compare(input.password, doctor.password);
      if (!isMatch) {
        throw new ApolloError("Invalid password!", "INVALID_PASSWORD");
      }
      const token = await JWT.issueJwt(doctor._id.toString(), "5m");

      const newAuth = new User.Auth({
        token: token,
        user: doctor._id,
        accountType: "DOCTOR",
      });
      console.log("happy");
      await newAuth.save();

      return {
        id: doctor._id,
        ...doctor._doc,
        token,
      };
    },
  },
  Query: {
    async viewLoginDoctor(_, { id }) {
      record = await User.Doctor.findById(id);
      return record;
    },
  },
};
