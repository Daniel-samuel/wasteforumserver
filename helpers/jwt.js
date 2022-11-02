const jwt = require("jsonwebtoken");
const { ApolloError } = require('apollo-server-express');

const JWT_SECRET_KEY = "secret";

const issueJwt = async (id, expiration) => {
  return jwt.sign(
    {
      sub: id,
    },
    id,
    { expiresIn: expiration || "1h" }
  );
}


const verifyJwt =  async (token) => {
  jwt.verify(
    token,
    JWT_SECRET_KEY,
    { maxAge: "7d" },
    (err, decoded) => {
      if (err) {
        return new ApolloError("Token has expired!", "INVALID_TOKEN");
      } else {
        return decoded;
      }
    }
  );
}

const exportVariables = {
  issueJwt,
  verifyJwt
};

module.exports = exportVariables;