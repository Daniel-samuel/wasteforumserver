const User = require("../../models/User");
const General = require("../../models/Generalinfo");

module.exports = {
  Mutation: {
    async createWalkIn(_, { input }) {
      const nurse = await User.Nurse.findById(input.Nurse);
      const hospital = await User.Hospital.findById(input.hospital);
      const newWalkIn = new General.WalkIn({
        ...input,
        sender: nurse,
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
