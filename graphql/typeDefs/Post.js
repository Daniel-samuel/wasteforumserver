const Post = `
type Post {
    body: String
    username: String
    createdAt: DateTime
    updatedAt: DateTime
    createdBy: String
}

input createPostInput {
    body: String
    username: String
}

type Query {
    listPost: [Post]
    getPost(postId: ID!): Post

}
type Mutation {
    createPost(input: createPostInput): Post!
    deletePost(postId: ID!): String 
}

`;

module.exports = Post;
