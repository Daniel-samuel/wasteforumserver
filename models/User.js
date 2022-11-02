const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const authSchema = new Schema(
  {
    token: { type: String },
    userId: { type: String },
    accountType: {type: String, enum:["AGENT", "HOSPITALADMIN", "DOCTOR", "PATIENT", "TURBOMEDADMIN"] }
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
    hospital: { type: Schema.Types.ObjectId, ref: "HOSPITAL", required: true },
    email: { type: String, unique: true },
    password: { type: String, unique: true },
  },
  opts
);

const doctorSchema = new Schema(
  {
    hospital: { type: Schema.Types.ObjectId, ref: "DOCTOR", required: true },
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
    hospital: { type: Schema.Types.ObjectId, ref: "HOSPITAL" },
    patient: { type: Schema.Types.ObjectId, ref: "PATIENT" },
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

const Auth = model("AUTH", authSchema);

const TurbomedAdmin = model("TURBOMEDADMIN", turbomedAdminSchema);
const Agent = model("AGENT", agentSchema);

const Hospital = model("HOSPITAL", hospitalSchema);
const HospitalAdmin = model("HOSPITALADMIN", hospitalAdminSchema);
const Doctor = model("DOCTOR", doctorSchema);

const Patient = model("PATIENT", patientSchema);
const PatientHospital = model("PATIENTHOSPITAL", patientHospitalSchema);

const exportVariables = {
  Auth,
  TurbomedAdmin,
  Agent,
  Hospital,
  HospitalAdmin,
  Doctor,
  Patient,
  PatientHospital,
};

module.exports = exportVariables;
