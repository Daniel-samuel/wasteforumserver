const User = require("../../models/User");
const Utils = require("../../helpers/utils");
const bcrypt = require("bcryptjs");
const JWT = require("../../helpers/jwt");
const { ApolloError } = require("apollo-server-express");

module.exports = {
  Mutation: {
    async createTurbo(_, { input }) {
      const emailExists = await User.TurbomedAdmin.findOne({
        email: input.email,
      });
      if (emailExists) {
        throw new ApolloError("Email already exists!", "EMAIL_EXISTS");
      }

      // Hash my password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(input.password, salt);

      const newRecord = new User.TurbomedAdmin({
        ...input,
        password: hashedPassword,
      });
      const response = await newRecord.save();
      console.log(response);
      const token = await JWT.issueJwt("response._id", "5m");

      // Save token to User.Auth
      const newAuth = new User.Auth({
        token: token,
        user: response._id,
        accountType: "PATIENT",
      });
      await newAuth.save();

      return {
        id: response._id,
        ...response._doc,
        token,
      };
    },

    async loginTurbo(_, { input }) {
      const { email, password } = input;
      const turboadmin = await User.TurbomedAdmin.findOne({ email });
      if (!turboadmin) {
        throw new ApolloError("Email does not exist!", "EMAIL_NOT_FOUND");
      }

      const isMatch = await bcrypt.compare(password, turboadmin.password);
      if (!isMatch) {
        throw new ApolloError("Invalid password!", "INVALID_PASSWORD");
      }
      const token = await JWT.issueJwt(turboadmin._id.toString(), "5m");

      // Save token to User.Auth
      const newAuth = new User.Auth({
        token: token,
        user: turboadmin._id,
      });
      await newAuth.save();

      console.log(turboadmin, "TURBO");
      return {
        id: turboadmin._id,
        ...turboadmin._doc,
        token,
      };
    },

    async reviewHospitalRegistrationRequest(_, { input }) {
      // Find the hospital registration request
      const record = await User.HospitalRegistrationRequest.findById(
        input.hospitalRegistrationRequestId
      );

      if (record) {
        if (record.status === "APPROVED") {
          throw new Error(
            "Hospital registration request has already been approved"
          );
        }

        // Update the status of the hospital registration request
        record.status = input.status;
        await record.save();

        // If the status is "APPROVED", create the hospital and hospital admin records
        if (record.status === "APPROVED") {
          // Create the hospital record
          const hospital = new User.Hospital({
            ...record.hospitalSchema,
          });
          await hospital.save();

          // Generate a password for the hospital admin
          const password = Utils.generatePassword();

          // Hash the password using bcrypt
          const saltRounds = 10;
          const hash = await bcrypt.hash(password, saltRounds);

          // Create the hospital admin record
          const hospitalAdmin = new User.HospitalAdmin({
            email: record.hospitalAdminSchema.email,
            password: hash,
            hospital: hospital._id,
          });
          await hospitalAdmin.save();

          // Send an email with the password to the hospital admin
          Utils.sendEmail({
            to: hospitalAdmin.email,
            subject: "Your hospital admin account has been created",
            text: `Your password is: ${password}`,
          });
        }

        return record;
      }

      throw new Error("Hospital registration request not found");
    },
  },

  Query: {
    async viewTurbomedAdmin(_, { id }) {
      record = await User.TurbomedAdmin.findById(id);
      return record;
    },
  },
};
