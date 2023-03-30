const Pharmacy = require("../../models/Pharmacys");

module.exports = {
  Mutation: {
    async PharmacyCreate(_, { input }) {
      const create = new Pharmacy.CreatePharmacy({
        ...input,
      });
      const response = await create.save();
      console.log(response);

      return {
        id: response._id,
        ...response._doc,
      };
    },
  },
};
