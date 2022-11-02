const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const commentSchema = new Schema(
  {
    body: String,
    accountType: String,
    userId: String,
  },
  opts
);

const postSchema = new Schema(
  {
    body: String,
    username: String,
    comments: [
      commentSchema
    ],
    postedby: {
      accountType: { type: String, enum: ["AGENT", "HOSPITALADMIN", "DOCTOR", "PATIENT", "TURBOMEDADMIN"] },
      userId: String,
    },
  },

  opts
);

module.exports = model("Post", postSchema);
