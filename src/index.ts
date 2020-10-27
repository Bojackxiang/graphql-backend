require("dotenv").config();

import { ApolloServer } from "apollo-server";
// const typeDefs = require("./schema"); // 定义了 上！
import {
  USER_RESOLVER,
  USER_SCHEMAS,
} from "./Schema_Resolvers/User/User_Resolver";
import DBUtils from "./Utils/DB/connection";
import Logger from "./Utils/Logger/logger";
import { resolvers, schemas } from "./Schema_Resolvers";



const server = new ApolloServer({
  context: async () => {
    const db = await DBUtils.connection();
    const logger = new Logger();

    return { db, logger };
  },
  typeDefs: schemas,
  resolvers: resolvers,
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then((result: any) => {
    console.log(`🚀 Server ready at ${result.url}`);
  });
