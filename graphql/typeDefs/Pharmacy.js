const Pharmacy = `
type pharmacySchema {
    _id:ID
    pharmacyName:String
    pharmacyAddress:String
    pharmacyContact:String
    pharmacyEmail:String
    pharmacyState:String
    pharmacyCountry:String
}

input pharmacySchemaInput{
    pharmacyName:String
    pharmacyAddress:String
    pharmacyContact:String
    pharmacyEmail:String
    pharmacyState:String
    pharmacyCountry:String
}
type adminPharmacy{
    _id:ID
    name:String
    email:String
    state:String
    country:String
    contact:String
}
input adminPharmacyInput{
    name:String
    email:String
    state:String
    country:String
    contact:String
}

type createPharmacy{
    pharmacySchema:pharmacySchema
    adminPharmacy:adminPharmacy
    status:createStatus
}
input createPharmacyInput{
    pharmacySchema:pharmacySchemaInput
    adminPharmacy:adminPharmacyInput
}

enum createStatus{
    PENDING
    APPROVED
    REJECTED
}



type Mutation {
    PharmacyCreate(input:createPharmacyInput):createPharmacy
}
`;
module.exports = Pharmacy;
