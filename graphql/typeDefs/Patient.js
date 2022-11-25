const Patient = `
  type Patient {
    name: String
    email: String
    address: String
    state: String
    country: String
    contactPhone: String
    contactName: String

    createdAt: DateTime
    updatedAt: DateTime
    createdBy: String

    token: String
  }

  input RegisterPatientInput {
    name: String
    email: String!
    password: String!
    address: String
    state: String
    country: String
    contactPhone: String
    contactName: String
  }

  type Query {
    viewPatient(id: ID!): Patient
    listPatient: [Patient]
  }
  type Mutation {
    createPatient(input: RegisterPatientInput): Patient!
    loginPatient(input: LoginInput): Patient
  }
`;
// LoginInput is defined in Auth.js; so we don't need to define it again here.
module.exports = Patient;
