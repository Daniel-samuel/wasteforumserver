const Post = `
type Post {
    _id: ID
    body: String
    comments: JSON
    username: String
    createdAt: DateTime
    updatedAt: DateTime
    createdBy: String
}

input createPostInput {
    body: String
    username: String
}
input addCommentToPostInput {
    postId: ID!
    comment: String
}

type Query {
    listPost: [Post]
    getPost(postId: ID!): Post

}
type Mutation {
    createPost(input: createPostInput): Post!
    addCommentToPost(input: addCommentToPostInput): Post!
    deletePost(id: ID!): String 
}

`;

module.exports = Post;
