const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const userSchema = new Schema(
  {
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  },
  opts
);

const turbomedAdminSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, unique: true },
  },
  opts
);

//////////////////////////////////////////////////////////////////////////////////////
/// Hospitals

const hospitalSchema = new Schema(
  {
    name: { type: String, default: null },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    contactPhone: { type: String },
    contactName: { type: String },
  },
  opts
);

const hospitalAdminSchema = new Schema(
  {
    hospital: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
    email: { type: String, unique: true },
    password: { type: String, unique: true },
  },
  opts
);

const doctorSchema = new Schema(
  {
    hospital: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    email: { type: String, unique: true },
    password: { type: String, unique: true },
  },
  opts
);

//////////////////////////////////////////////////////////////////////////////////////
/// Patient
const patientSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, unique: true },
  },
  opts
);

const patientHospitalSchema = new Schema(
  {
    active: { type: Boolean, default: true }, //if patient still uses the hospital
    hospital: { type: Schema.Types.ObjectId, ref: "Hospital" },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  },
  opts
);

//////////////////////////////////////////////////////////////////////////////////////
/// Agent

const agentSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, unique: true },
  },
  opts
);

const User = model("User", userSchema);
const TurbomedAdmin = model("TurbomedAdmin", turbomedAdminSchema);
const Agent = model("Agent", agentSchema);

const Hospital = model("Hospital", hospitalSchema);
const HospitalAdmin = model("HospitalAdmin", hospitalAdminSchema);
const Doctor = model("Doctor", doctorSchema);

const Patient = model("Patient", patientSchema);
const PatientHospital = model("PatientHospital", patientHospitalSchema);

const exportVariables = {
  User,
  TurbomedAdmin,
  Agent,
  Hospital,
  HospitalAdmin,
  Doctor,
  Patient,
  PatientHospital,
};

module.exports = exportVariables;
