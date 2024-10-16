const User = require("../../models/User");
const JWT = require("../../helpers/jwt");

module.exports = {
  Mutation: {
    async CreateRegister(_, { input }) {
      try {
        const newRegister = new User.Register({ ...input });
        const savedRegister = await newRegister.save();
        return savedRegister;
      } catch (error) {
        console.error("Error creating register:", error);
        throw new Error("Failed to create register");
      }
    },

    async Login(_, { input }) {
      const { number, email } = input;

      const user = await User.Register.findOne({ number, email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      // Issue a JWT using the user's id and name
      const token = JWT.issueJwt(user.id.toString(), "1h"); // You can set expiration as needed

      return {
        token, // Return the token
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          number: user.number,
          role: user.role,
          company: user.company, // Include other user details if needed
          // Add any other fields you want to return
        },
      };
    },

    async CreateCommitment(_, { input }) {
      // Verify that the register exists
      const register = await User.Register.findById(input.register);
      console.log(register);
      if (!register) {
        throw new Error("Register not found");
      }

      // Create and save the commitment
      const commitment = new User.Commitment({
        register: register._id,
        message: input.message,
      });
      await commitment.save();

      // Populate the register field
      const populatedCommitment = await commitment.populate("register");

      return populatedCommitment;
    },
  },

  Query: {
    async GetRegisterByRole(_, { role }) {
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

    async getCommitmentById(_, { id }) {
      const commitment = await User.Commitment.findById(id).populate(
        "register"
      );
      if (!commitment) {
        throw new Error("Commitment not found");
      }
      return commitment;
    },

    async getCommitmentsByRegister(_, { register }) {
      const registerExists = await User.Register.findById(register);
      if (!registerExists) {
        throw new Error("Register entry not found");
      }

      const commitments = await User.Commitment.find({ register }).populate(
        "registerId"
      );

      return commitments;
    },
  },
};
