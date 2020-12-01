require("dotenv").config();

import { ApolloServer } from "apollo-server";

import { resolvers, schemas } from "./Schema_Resolvers";
import { contextGenerator } from "./context";
import { subscriber } from "./Utils/Queue/Receiver";
import { Testing } from "./Schema_Resolvers/Testing/Testing";
import { connect, MongoClient } from "mongodb";

// subscriber()

const client = new MongoClient('mongodb://localhost:27017/localtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect();

const server = new ApolloServer({
  context: async ({ req }) => {
    const contexts = await contextGenerator();
    return { ...contexts, request: req };
  },
  typeDefs: schemas,
  resolvers: resolvers,
  dataSources: () => {
    return {
      users: new Testing(client.db().collection("users")),
    };
  },
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then((result: any) => {
    console.log(`🚀 Server ready at ${result.url}`);
  });
