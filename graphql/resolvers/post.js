const Post = require("../../models/Post");
const authenticate = require("../../helpers/authenticate"); // For the user to be able to create a post, they must be logged in. We can use the authenticate function to get the user from the context.

module.exports = {
  Mutation: {
    createPost: async (_, { input }, context) => {
      // get the user from the context
      const user = await authenticate(context);

      const newPost = new Post({
        ...input,
        // comments: [],
        postedBy: {
          accountType: user.accountType,
          userId: user.userId,
        },
      });
      const post = await newPost.save();
      return post;
    },

    addCommentToPost: async (_, { input }, context) => {
      const user = await authenticate(context);

      const post = await Post.findById(input.postId);
      if (post) {
        post.comments.unshift({
          ...input,
          accountType: user.accountType,
          userId: user.userId,
        });
        await post.save();
        return post;
      } else throw new Error("Post not found");
    },
  },

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
};
