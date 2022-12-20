const Doctor = `
type LoginDoctor {
    password: String!
    email: String!
    token: String
}

input LoginDoctorInput{
    password: String!
    email: String!
}
type Mutation {
    loginDoctor(input:LoginDoctorInput):LoginDoctor
}

`;

module.exports = Doctor;
