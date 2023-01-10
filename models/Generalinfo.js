const { model, Schema } = require("mongoose");
const opts = {
  timestamps: true,
};

const patientWalkinFormSchema = new Schema(
  {
    hospital: { type: Schema.Types.ObjectId, ref: "HOSPITAL", required: true },
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
    },
    Contact: {
      type: String,
    },
    Address: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Sex: {
      type: String,
    },
    AlergyHistory: {
      type: String,
    },
    Complaint: {
      type: String,
    },

    TimeCreated: {
      type: Number,
    },
    DateCreated: {
      type: Number,
    },
  },
  opts
);

const WalkIn = model("WalkIn", patientWalkinFormSchema);

const exportVariables = {
  WalkIn,
};

module.exports = exportVariables;
