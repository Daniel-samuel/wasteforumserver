const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const postSchema = new Schema(
  {
    body: String,
    username: String,
    comments: [
      {
        body: String,
        username: String,
      },
    ],
    postedby: {
      accountType: { type: String, emum: ["Agent", "Doctor"] },
      userId: String,
    },
  },

  opts
);

module.exports = model("Post", postSchema);
