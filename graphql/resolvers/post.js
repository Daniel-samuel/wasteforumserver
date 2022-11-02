const Post = require("../../models/Post");

module.exports = {
  Query: {
    async listPost() {
      const getpost = await Post.find();
      return getpost;
    },

    async getPost(_, { postId }) {
      const findPost = await Post.findById(postId);
      if (findPost) {
        return findPost;
      } else {
        throw new Error("post not found");
      }
    },
  },
  Mutation: {},
};
