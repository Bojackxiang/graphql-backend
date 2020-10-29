require("dotenv").config();

import { ApolloServer } from "apollo-server";
// const typeDefs = require("./schema"); // 定义了 上！
import DBUtils from "./Utils/DB/connection";
import Logger from "./Utils/Logger/logger";
import { resolvers, schemas } from "./Schema_Resolvers";
import { contextGenerator } from "./context";


const server = new ApolloServer({
  
  context: async ({req}) => {
    const contexts = await contextGenerator()
    return {...contexts, request: req}
  },

  typeDefs: schemas,
  resolvers: resolvers,
  playground: {
    settings: {
      "request.credentials": "include"
    }
  }
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then((result: any) => {
    console.log(`🚀 Server ready at ${result.url}`);
  });
