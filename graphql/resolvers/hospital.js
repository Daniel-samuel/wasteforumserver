const User = require("../../models/User");
const Utils = require("../../helpers/utils");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    async createHospitalRegistrationRequest(_, { input }) {
      // Create a new HospitalRegistrationRequest object with the input data
      const newHospitalRegistrationRequest =
        new User.HospitalRegistrationRequest({
          ...input,
        });

      // Save the HospitalRegistrationRequest object to the database
      const hospitalRegistrationRequestResponse =
        await newHospitalRegistrationRequest.save();
      console.log(hospitalRegistrationRequestResponse);

      // Send an email to the Turbomed admin
      Utils.sendEmail({
        to: "folarinded@gmail.com",
        subject: "New Hospital Registration Request",
        text: `Details: ${JSON.stringify(hospitalRegistrationRequestResponse)}`,
      });

      // Return the ID and the rest of the data for the HospitalRegistrationRequest object
      return {
        id: hospitalRegistrationRequestResponse._id,
        ...hospitalRegistrationRequestResponse._doc,
      };
    },

    async hospitalAdminCreateDoctor(_, { input }) {
      // Check that the hospital exists
      const hospital = await User.Hospital.findById(input.hospital);
      if (!hospital) {
        throw new Error("Hospital not found.");
      }
      const password = Utils.generatePassword();

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      // Create the doctor
      const doctor = new User.Doctor({
        ...input,
        password: hash,
      });
      await doctor.save();

      // Send an email with the password to the hospital admin
      Utils.sendEmail({
        to: input.email,
        subject: "Your Doctor account has been created",

        text: `Your Email is: ${input.email} and Your password is: ${password}`,
      });

      return doctor;
    },

    async hospitalAdminCreateNurse(_, { input }) {
      // Check that the hospital exists
      const hospital = await User.Hospital.findById(input.hospital);
      if (!hospital) {
        throw new Error("Hospital not found.");
      }
      const password = Utils.generatePassword();

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      // Create the doctor
      const nurse = new User.Nurse({
        ...input,
        password: hash,
      });
      await nurse.save();

      // Send an email with the password to the hospital admin
      Utils.sendEmail({
        to: input.email,
        subject: "Your Doctor account has been created",
        text: `Your Email is: ${input.email} and Your password is: ${password}`,
      });

      return nurse;
    },
  },
  Query: {
    async viewHospital(_, { id }) {
      record = await User.Hospital.findById(id);
      return record;
    },
    async listHospital(_, {}, context) {
      records = await User.Hospital.find();
      return records;
    },
    async listHospitalAdminCreateDoctor(_, {}, context) {
      record = await User.Doctor.find();
      return record;
    },
    async viewHospitalAdminCreateDoctor(_, { id }) {
      record = await User.Doctor.findById(id);
      return record;
    },

    async listHospitalAdminCreateNurse(_, {}, context) {
      record = await User.Nurse.find();
      return record;
    },
    async viewHospitalAdminCreateNurse(_, { id }) {
      record = await User.Nurse.findById(id);
      return record;
    },

    async llistHospitalRegistrationRequest(_, {}, context) {
      record = await User.HospitalRegistrationRequest.find();
      return record;
    },

    async listHospitalRegistrationRequest(_, { input }) {
      records = await User.HospitalRegistrationRequest.find(...input);
      return records;
    },
  },
};
