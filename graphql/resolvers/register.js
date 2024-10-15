const User = require("../../models/User");

module.exports = {
  Mutation: {
    async createRegister(_, { input }) {
      try {
        const newRegister = new User.Register({ ...input });
        const savedRegister = await newRegister.save();
        return savedRegister;
      } catch (error) {
        console.error("Error creating register:", error);
        throw new Error("Failed to create register");
      }
    },
  },

  Query: {
    async getRegisterByRole(_, { role }) {
      try {
        const registers = await User.Register.find({ role });
        return registers;
      } catch (error) {
        console.error("Error fetching register by role:", error);
        throw new Error("Failed to fetch register by role");
      }
    },

    async listRegisters() {
      try {
        const registers = await User.Register.find();
        return registers;
      } catch (error) {
        console.error("Error listing registers:", error);
        throw new Error("Failed to list registers");
      }
    },
  },
};
