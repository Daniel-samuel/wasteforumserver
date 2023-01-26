const Doctor = `
type LoginDoctor {
    _id: ID
    hospital:ID
    name:String
    password: String!
    email: String!
    token: String
}

input LoginDoctorInput{
    password: String!
    email: String!
}

type Query {
    viewLoginDoctor(id: ID!): LoginDoctor
    listLoginDoctor: [LoginDoctor]
}
type Mutation {
    loginDoctor(input:LoginDoctorInput):LoginDoctor
}

`;

module.exports = Doctor;
