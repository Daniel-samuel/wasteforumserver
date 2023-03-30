const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const loginPharmacy = new Schema(
  {
    pharmacyCode: { type: String },
    email: { type: String },
    password: { type: String },
  },
  opts
);

const pharmacySchema = new Schema(
  {
    pharmacyName: { type: String },
    pharmacyAddress: { type: String },
    pharmacyContact: { type: String },
    pharmacyEmail: { type: String },
    pharmacyState: { type: String },
    pharmacyCountry: { type: String },
  },
  opts
);

const adminPharmacy = new Schema(
  {
    // pharmacySchema: {
    //   pharmacyName: { type: String },
    //   pharmacyAddress: { type: String },
    //   pharmacyContact: { type: String },
    //   pharmacyEmail: { type: String },
    //   pharmacyState: { type: String },
    //   pharmacyCountry: { type: String },
    // },

    pharmacy: { type: Schema.Types.ObjectId, ref: "PHARMACY", required: true },
    name: { type: String },
    email: { type: String },
    state: { type: String },
    country: { type: String },
    contact: { type: String },
  },
  opts
);

const createPharmacy = new Schema(
  {
    pharmacySchema: {
      pharmacyName: { type: String },
      pharmacyAddress: { type: String },
      pharmacyContact: { type: String },
      pharmacyEmail: { type: String },
      pharmacyState: { type: String },
      pharmacyCountry: { type: String },
    },

    adminPharmacy: {
      name: { type: String },
      email: { type: String },
      state: { type: String },
      country: { type: String },
      country: { type: String },
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  opts
);

const createProduct = new Schema(
  {
    pharmacy: { type: Schema.Types.ObjectId, ref: "PHARMACY", required: true },
    productName: { type: String },
    ProductCode: { type: String },
    ProductPrice: { type: String },
    stockID: { type: String },
    weight: { type: String },
    supplier: { type: String },
    supplyDate: { type: String },
    expDate: { type: String },
  },
  opts
);

const requestProduct = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "CREATEPRODUCT",
      required: true,
    },
    quantity: { type: Number },
    name: { type: String },
    address: { type: String },
    email: { type: String },
    contact: { type: String },
  },
  opts
);

const productDelivery = new Schema(
  {
    request: {
      type: Schema.Types.ObjectId,
      ref: "REQUESTPRODUCT",
      required: true,
    },
    adminpharmacy: {
      type: Schema.Types.ObjectId,
      ref: "ADMINPHAMACY",
      required: true,
    },
  },
  opts
);

const CreatePharmacy = model("CREATEPHAMACY", createPharmacy);
const LoginPharmacy = model("LOGIN", loginPharmacy);
const Pharmacy = model("PHARMACY", pharmacySchema);
const AdminPharmacy = model("ADMINPHAMACY", adminPharmacy);
const CreateProduct = model("CREATEPRODUCT", createProduct);
const RequestProduct = model("REQUESTPRODUCT", requestProduct);
const ProductDelivery = model("PRODUCTDELIVERY", productDelivery);

const exportVariables = {
  CreatePharmacy,
  LoginPharmacy,
  Pharmacy,
  AdminPharmacy,
  CreateProduct,
  RequestProduct,
  ProductDelivery,
};
module.exports = exportVariables;
