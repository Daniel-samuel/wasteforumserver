const User = require("../../models/User");
const General = require("../../models/Generalinfo");
const { ApolloError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const JWT = require("../../helpers/jwt");
module.exports = {
  Mutation: {
    async LoginNurse(_, { input }) {
      const nurse = await User.Nurse.findOne({
        email: input.email,
      });
      if (!nurse) {
        throw new ApolloError("Email does not exist!", "EMAIL_NOT_FOUND");
      }
      const isMatch = await bcrypt.compare(input.password, nurse.password);
      if (!isMatch) {
        throw new ApolloError("Invalid password!", "INVALID_PASSWORD");
      }
      const token = await JWT.issueJwt(nurse._id.toString(), "5m");

      const newAuth = new User.Auth({
        token: token,
        user: nurse._id,
        accountType: "DOCTOR",
      });
      console.log("happy");
      await newAuth.save();

      return {
        id: nurse._id,
        ...nurse._doc,
        token,
      };
    },
  },
};
