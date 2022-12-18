const Hospital = `
  type Hospital {
    _id: ID
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

  type HospitalAdmin {
    email: String
    password: String
  }

  type HospitalRegistrationRequest {
    hospitalSchema: Hospital
    hospitalAdminSchema: HospitalAdmin
    status: HospitalRegistrationRequestStatus
  }

  type HospitalAdminLogin {
    email: String
    password: String
}

   type HospitalAdminCreateDoctor {
    email: String
    password: String
    name:String
    address:String
    state: String
    country:String
    contactPhone:String
    category: DoctorCategory
}

   input HospitalAdminCreateDoctorinput{
    hospital:String
    email: String
    password: String
    name:String
    address:String
    state: String
    country:String
    contactPhone:String
    category: DoctorCategory
   }

input HospitalAdminLoginInput {
    email: String
    password: String
}

 enum DoctorCategory{
  CARDIOLOGIST
   DENTIST 
   DERMATOLOGIST
    ENT
     GASTROENTEROLOGIST
      GENERAL PRACTITIONER
       GYNAECOLOGIST
        NEUROLOGIST
         ORTHOPAEDIC
          SURGEON
           PAEDIATRICIAN
            PHYSIOTHERAPIST
             PSYCHIATRIST 
             UROLOGIST
}

  input HospitalRegistrationInput {
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    contactName: String

    hospitalLicence: String!
  }

  input HospitalAdminRegistrationInput {
    email: String!
  }

  input HospitalRegistrationRequestInput {
    hospitalSchema: HospitalRegistrationInput
    hospitalAdminSchema: HospitalAdminRegistrationInput
  }

  input ListHospitalRegistrationRequestInput {
    status: HospitalRegistrationRequestStatus
  }

  enum HospitalRegistrationRequestStatus {
    PENDING
    APPROVED
    REJECTED
  }
  type Query {
    viewHospital(id: ID!): Hospital
    listHospital: [Hospital]
    listHospitalRegistrationRequest(input: ListHospitalRegistrationRequestInput): [HospitalRegistrationRequest]
  }

  type Mutation {
    createHospitalRegistrationRequest(input: HospitalRegistrationRequestInput): HospitalRegistrationRequest
    createHospitalAdminLogin(input: HospitalAdminLoginInput): HospitalAdminLogin
    hospitalAdminCreateDoctor(input:HospitalAdminCreateDoctorinput ): HospitalAdminCreateDoctor
  }
`;

module.exports = Hospital;
