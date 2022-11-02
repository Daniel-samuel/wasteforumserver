const Message = require("../../models/Message");
const { ApolloError } = require("apollo-server-errors");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      //see if an old account exist already
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new ApolloError(
          "A user is already registrated with this email" + email,
          "USER_ALREADY_EXIST"
        );
      }

      //encrypt password using bcrypt
      var encryptedpassword = await bcrypt.hash(password, 10);

      //Buildout  mongoose model (User)
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedpassword,
      });
      //create our jwt(attached to our User model)
      const token = jwt.sign({ user_id: newUser._id, email }, "UNSAFE_STRING", {
        expiresIn: "2h",
      });
      newUser.token = token;

      //saving our user in mongodb
      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      // see if  user exixt with the email
      const user = await User.findOne({ email });
      //check if the password equals the encrypted password
      if (user && (await bcrypt.compare(password, user.password))) {
        //create a new token
        const token = jwt.sign({ user_id: user._id, email }, "UNSAFE_STRING", {
          expiresIn: "2h",
        });
        //attach token of user model that we find above
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        // if user doesnt exist return error
        throw new ApolloError("incorrect password", "INCORRECT_PASSWORD ");
      }
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
