const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const MONGODB =
  "mongodb+srv://Daniel:happy@apollologin.xldzbmx.mongodb.net/turbomed?retryWrites=true&w=majority";

// const MONGODB = "mongodb://localhost:27017/testing";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 8080 });
  })
  .then((res) => {
    console.log(`Server is running on ${res.url}`);
  });
