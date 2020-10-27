require("dotenv").config();

import { ApolloServer } from "apollo-server";
// const typeDefs = require("./schema"); // 定义了 上！
import DBUtils from "./Utils/DB/connection";
import Logger from "./Utils/Logger/logger";
import { resolvers, schemas } from "./Schema_Resolvers";
import { contextGenerator } from "./context";

const server = new ApolloServer({
  context: () => contextGenerator(),
  typeDefs: schemas,
  resolvers: resolvers,
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then((result: any) => {
    console.log(`🚀 Server ready at ${result.url}`);
  });
