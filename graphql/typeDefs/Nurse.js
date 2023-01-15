const Nurse = `
type LoginNurse {
    _id: ID
    hospital:ID
    password: String!
    email: String!
    token: String
}

input LoginNurseInput{
    password: String!
    email: String!
}

type Query {
    viewLoginNurse(id: ID!): LoginNurse
    listLoginNurse: [LoginNurse]
}
type Mutation {
    loginNurse(input:LoginNurseInput):LoginNurse
}


`;

module.exports = Nurse;
