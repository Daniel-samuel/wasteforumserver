const Turbomed = `
    type TurbomedAdmin {
        _id:ID
        name:String
        email: String
        password: String
        token:String
    }

    input TurbomedAdminInput {
        name:String
        email: String
        password: String    

    }

    input ReviewHospitalRegistrationRequestInput {

        hospitalRegistrationRequestId: ID! 
        status: HospitalRegistrationRequestStatus
    }

   input ReviewPharmacyInput {
    pharmacyId: ID!
    status:createStatus
   }
 

    type Query{
        viewTurbomedAdmin(id: ID!): TurbomedAdmin
        viewreviewHospitalRegistrationRequest(id:ID):HospitalRegistrationRequest
    }
    
    type Mutation {
        reviewHospitalRegistrationRequest(input: ReviewHospitalRegistrationRequestInput): HospitalRegistrationRequest
        reviewPharmacy(input:ReviewPharmacyInput):createPharmacy
        createTurbo(input: TurbomedAdminInput):TurbomedAdmin
        loginTurbo(input:LoginInput):TurbomedAdmin
    }
    
`;

module.exports = Turbomed;
