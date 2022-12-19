const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const authSchema = new Schema(
  {
    token: { type: String },
    userId: { type: String },
    accountType: {
      type: String,
      enum: ["AGENT", "HOSPITALADMIN", "DOCTOR", "PATIENT", "TURBOMEDADMIN"],
    },
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

const hospitalRegistrationRequest = new Schema({
  hospitalSchema: {
    name: { type: String, default: null },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    contactPhone: { type: String },
    contactName: { type: String },

    hospitalLicence: { type: String },
  },
  hospitalAdminSchema: {
    email: { type: String, unique: true },
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
});

const hospitalSchema = new Schema(
  {
    name: { type: String, default: null },
    address: { type: String },
    state: { type: String },
    country: { type: String },
    contactPhone: { type: String },
    contactName: { type: String },

    hospitalLicence: { type: String },
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

const hospitalAdminCreateDoctorSchema = new Schema({
  hospital: { type: Schema.Types.ObjectId, ref: "HOSPITAL", required: true },
  email: { type: String, unique: true },
  password: { type: String },
  category: {
    type: String,
    enum: [
      "CARDIOLOGIST",
      "DENTIST",
      "DERMATOLOGIST",
      "ENT",
      "GASTROENTEROLOGIST",
      "GENERAL PRACTITIONER",
      "GYNAECOLOGIST",
      "NEUROLOGIST",
      "ORTHOPAEDIC SURGEON",
      "PAEDIATRICIAN",
      "PHYSIOTHERAPIST",
      "PSYCHIATRIST",
      "UROLOGIST",
    ],
  },
  name: { type: String },
  address: { type: String },
  state: { type: String },
  country: { type: String },
  contactPhone: { type: String },
});

const hospitalAdminCreateNurseSchema = new Schema({
  hospital: { type: Schema.Types.ObjectId, ref: "HOSPITAL", required: true },
  email: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
  address: { type: String },
  state: { type: String },
  country: { type: String },
  contactPhone: { type: String },
});

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
const Doctor = model("Doctor", hospitalAdminCreateDoctorSchema);
const Nurse = model("Nurse", hospitalAdminCreateNurseSchema);
const HospitalRegistrationRequest = model(
  "HospitalRegistrationRequest",
  hospitalRegistrationRequest
);
const Hospital = model("HOSPITAL", hospitalSchema);
const HospitalAdmin = model("HOSPITALADMIN", hospitalAdminSchema);

const Patient = model("PATIENT", patientSchema);
const PatientHospital = model("PATIENTHOSPITAL", patientHospitalSchema);

const exportVariables = {
  Auth,
  TurbomedAdmin,
  Agent,

  HospitalRegistrationRequest,
  Hospital,
  HospitalAdmin,

  Doctor,
  Nurse,
  Patient,
  PatientHospital,
};

module.exports = exportVariables;