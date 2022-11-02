const Hospital = `
  type Hospital {
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    contactName: String

    createdAt: DateTime
    updatedAt: DateTime
    createdBy: String
  }

  input HospitalRegisterInput {
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    contactName: String
    
    email: String!
    password: String!
  }

  type Query {
    viewHospital(id: ID!): Hospital
    listHospital: [Hospital]
  }
  type Mutation {
    createHospital(input: HospitalRegisterInput): Hospital!
  }
`;

module.exports = Hospital;
