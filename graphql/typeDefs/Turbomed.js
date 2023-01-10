const Turbomed = `
    type TurbomedAdmin {
        email: String
        password: String
    }

    input TurbomedAdminInput {
        email: String
        password: String    

    }

    input ReviewHospitalRegistrationRequestInput {

        hospitalRegistrationRequestId: ID! 
        status: HospitalRegistrationRequestStatus
    }
 
    
    type Mutation {
        reviewHospitalRegistrationRequest(input: ReviewHospitalRegistrationRequestInput): HospitalRegistrationRequest
        createTurbo(input: TurbomedAdminInput):TurbomedAdmin
        loginTurbo(input:LoginInput):TurbomedAdmin
    }
    
`;

module.exports = Turbomed;
