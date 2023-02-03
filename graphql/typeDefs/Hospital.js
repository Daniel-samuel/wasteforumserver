const Hospital = `
  type Hospital {
    _id: ID
    name: String
    address: String
    state: String
    country: String
    hospitalLicence:String
    doctorCount:Float
    nurseCount:Float
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
    _id: ID
    hospitalSchema: Hospital
    hospitalAdminSchema: HospitalAdmin
    status: HospitalRegistrationRequestStatus
  }

  type HospitalAdminLogin {
    _id: ID
    hospital: ID
    email: String

    password: String
  }

  type HospitalAdminCreateDoctor {
    _id: ID
    hospital: String
    email: String
    password: String
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    category: DoctorCategory
    age: String
    sex:SexCategory
    DOB: String
    biography: String
  }

  input UpdateDoctorInput {
    email: String
    password: String
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    category: DoctorCategory
    age: String
    sex:SexCategory
    DOB: String
    biography: String
    
  }

  type HospitalAdminCreateNurse {
    _id: ID
    hospital: String
    email: String
    password: String
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    age:String
    sex:SexCategory
    biography:String

  }

  input HospitalAdminCreateNurseinput {
    hospital: String
    email: String
    password: String
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    age:String
    sex:SexCategory
    biography:String
  }

  input HospitalAdminCreateDoctorinput {
    hospital: String
    email: String
    password: String
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    category: DoctorCategory
    age: String
    sex:SexCategory
    DOB: String
    biography: String
  }

  input HospitalAdminLoginInput {
    email: String
    password: String
  }

  enum DoctorCategory {
    CARDIOLOGIST
    DENTIST
    DERMATOLOGIST
    ENT
    GASTROENTEROLOGIST
    GENERAL
    PRACTITIONER
    GYNAECOLOGIST
    NEUROLOGIST
    ORTHOPAEDIC
    SURGEON
    PAEDIATRICIAN
    PHYSIOTHERAPIST
    PSYCHIATRIST
    UROLOGIST
  }

  enum SexCategory{
    MALE
    FEMALE
  }

  input HospitalRegistrationInput {
    name: String
    address: String
    state: String
    country: String
    contactPhone: String
    contactName: String
    doctorCount:Float
    nurseCount:Float
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
    listHospitalRegistrationRequest(
      input: ListHospitalRegistrationRequestInput
    ): [HospitalRegistrationRequest]
    listHospitalAdminCreateDoctor:[HospitalAdminCreateDoctor]
    viewHospitalAdminCreateDoctor(id: ID):HospitalAdminCreateDoctor
    listHospitalAdminCreateNurse:[HospitalAdminCreateNurse]
    viewHospitalAdminCreateNurse(id: ID):HospitalAdminCreateNurse
    llistHospitalRegistrationRequest:[HospitalRegistrationRequest]
    viewHospitalRegistrationRequest(id:ID): HospitalRegistrationRequest

    }
    
  type Mutation {
    createHospitalRegistrationRequest(
      input: HospitalRegistrationRequestInput
    ): HospitalRegistrationRequest
    createHospitalAdminLogin(input: HospitalAdminLoginInput): HospitalAdminLogin
    hospitalAdminCreateDoctor(
      input: HospitalAdminCreateDoctorinput
    ): HospitalAdminCreateDoctor
    hospitalAdminCreateNurse(
      input: HospitalAdminCreateNurseinput
    ): HospitalAdminCreateNurse
    updateDoctor(id: ID!, input: UpdateDoctorInput!): HospitalAdminCreateDoctor!
  }
`;

module.exports = Hospital;
