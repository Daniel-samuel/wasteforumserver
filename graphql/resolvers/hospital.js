const User = require("../../models/User");

module.exports = {
  Mutation: {
    async createHospital(_, { input }) {
      const newHospital = new User.Hospital({
        ...input,
        // name: name,
      });
      const hospitalResponse = await newHospital.save();
      console.log(hospitalResponse);

      const newHospitalAdmin = new User.HospitalAdmin({
        email: input.email,
        password: input.password,
        hospital: hospitalResponse._id,
      });
      await newHospitalAdmin.save();

      return {
        id: hospitalResponse._id,
        ...hospitalResponse._doc,
      };
    },
  },
  Query: {
    async viewHospital(_, { id }) {
      record = await User.Hospital.findById(id);
      return record;
    },
    async listHospital(_, {}) {
      records = await User.Hospital.find();
      return records;
    },
  },
};
