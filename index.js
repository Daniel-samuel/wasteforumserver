// const { ApolloServer } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const express = require("express");

const MONGODB =
  "mongodb+srv://Daniel:happy@apollologin.xldzbmx.mongodb.net/turbomed?retryWrites=true&w=majority";
// "mongodb+srv://Daniel:happy@amazon-clone.emkkn.mongodb.net/turbomed?retryWrites=true&w=majority";

// const MONGODB = "mongodb://localhost:27017/testing";

const app = express();

const startServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,

      context: (req) => {
        return { ...req };
      },
    });
    await server.start();

    mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
      // console.log("MongoDB connected");
      // return server.listen({ port: 3000 });

      server.applyMiddleware({ app });
      app.listen(process.env.PORT || 3000, () =>
        console.log(
          `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
        )
      );
    });
    // .then((res) => {
    //   console.log(`Server is running on ${res.url}`);
    // });
  } catch (err) {
    throw err;
    å;
  }
};

startServer();
