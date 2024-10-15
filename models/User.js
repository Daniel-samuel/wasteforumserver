const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const register = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
});

const commitmentSchema = new Schema({
  register: {
    type: Schema.Types.ObjectId,
    ref: "REGISTER",
    required: true,
  },
  message: { type: String, required: true },
  committedAt: { type: Date, default: Date.now },
});

const Register = model("REGISTER", register);
const Commitment = model("COMMITMENT", commitmentSchema);

const exportVariables = {
  Register,
  Commitment,
};

module.exports = exportVariables;
