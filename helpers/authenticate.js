const { verifyJwt } = require("./jwt");

const mongoose = require('mongoose');
const User = require("../models/User");

const { ApolloError } = require('apollo-server-express');

const authenticate = async ({ req }) => {
  try {
    console.log(">>>", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const auth = await User.Auth.findOne({ token });

      if (auth) {
        await verifyJwt(auth.token);

        return {
          userId: auth.userId,
          accountType: auth.accountType,
        };
      } else {
        throw new ApolloError("Token is not valid!", "INVALID_TOKEN");
      }
    } else {
      throw new ApolloError("No token provided!", "INVALID_TOKEN");
    }
  } catch (err) {
    throw err;
  }
};

module.exports = authenticate;
