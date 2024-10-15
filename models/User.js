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

const Register = model("REGISTER", register);

const exportVariables = {
  Register,
};

module.exports = exportVariables;
