require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
// const typeDefs = require("./schema"); // 定义了 上！
import { userResolvers } from "./resolvers";
import DBUtils from "./DB/connection";

const server = new ApolloServer({
  context: async () => {
    const db = DBUtils.connection();

    return { db: db ?? undefined };
  },
  typeDefs: [typeDefs],
  resolvers: [userResolvers],
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then((result: any) => {
    console.log(`🚀 Server ready at ${result.url}`);
  });
