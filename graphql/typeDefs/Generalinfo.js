const Generalinfo = `


type WalkIn {
    Name: String
    Email: String
    Contact: String
    hospital:String
    Address: String
    DOB: String
    Age: String
    Sex: String
    AlergyHistory: Alergy
    Complaint: String
    createdAt: DateTime
    updatedAt: DateTime
    createdBy: String
   
  }

  enum Alergy {
    DOG CARROT PILLS COCO WEED BALABLU OTHERS
  }


  input WalkInInput {
  
    doctorId: ID
    hospital: String
    Name: String
    Email: String
    Contact: String
    Address: String
    DOB: String
    Age: String
    Sex: String
    AlergyHistory: Alergy
    Complaint: String
   
  }
 
  type Mutation {
    createWalkIn(input:WalkInInput):WalkIn
  }
  `;
module.exports = Generalinfo;
