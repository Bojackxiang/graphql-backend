require("dotenv").config();

import { ApolloServer } from "apollo-server";

import { resolvers, schemas } from "./Schema_Resolvers";
import { contextGenerator } from "./context";
import { subscriber } from "./Utils/Queue/Receiver";

subscriber();

const server = new ApolloServer({
  context: async ({ req }) => {
    const contexts = await contextGenerator();
    return { ...contexts, request: req };
  },
  typeDefs: schemas,
  resolvers: resolvers,
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
