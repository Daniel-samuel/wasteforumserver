const User = require("../../models/User");
const General = require("../../models/Generalinfo");

module.exports = {
  Mutation: {
    async createWalkIn(_, { input }) {
      const doctor = await User.Doctor.findById(input.doctorId);
      const hospital = await User.Hospital.findById(input.hospital);
      const newWalkIn = new General.WalkIn({
        ...input,
        sender: doctor,
        from: hospital,
      });
      try {
        await newWalkIn.save();
        User.Doctor(newWalkIn);
        return newWalkIn;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
