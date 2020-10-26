require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { USER_SCHEMAS } from "./Schemas/User_Schemas/User_Schema";
// const typeDefs = require("./schema"); // 定义了 上！
import { userResolvers } from "./Resolvers/User_Resolvers/resolvers";
import DBUtils from "./DB/connection";
import Logger from "./Logger/logger";

const server = new ApolloServer({
  context: async () => {
    const db = await DBUtils.connection();
    const logger = new Logger();

    return { db, logger };
  },
  typeDefs: [USER_SCHEMAS],
  resolvers: [userResolvers],
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then((result: any) => {
    console.log(`🚀 Server ready at ${result.url}`);
  });
