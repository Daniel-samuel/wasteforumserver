const HospitalAdminLogin = gql`
    type HospitalAdminLogin {
        email: String
        password: String
        createdAt: DateTime
        updatedAt: DateTime
         createdBy: String
    }
    input HospitalAdminLoginInput {
        email: String
        password: String
    }
    type Mutation {
        createHospitalAdminLogin(input: HospitalAdminLoginInput): HospitalAdminLogin
    }
    `