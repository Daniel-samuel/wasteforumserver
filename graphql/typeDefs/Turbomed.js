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
 

    type Query{
        viewTurbomedAdmin(id: ID!): TurbomedAdmin
    }
    
    type Mutation {
        reviewHospitalRegistrationRequest(input: ReviewHospitalRegistrationRequestInput): HospitalRegistrationRequest
        createTurbo(input: TurbomedAdminInput):TurbomedAdmin
        loginTurbo(input:LoginInput):TurbomedAdmin
    }
    
`;

module.exports = Turbomed;
