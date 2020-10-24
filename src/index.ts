require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
// const typeDefs = require("./schema"); // 定义了 上！
import {userResolvers} from "./resolvers";
import { MongoClient } from "mongodb";

const server = new ApolloServer({
  context: async () => {
    const client = new MongoClient(process.env.DB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const db = client.db(process.env.DB_NAME);

    return { db };
  },
  typeDefs: [typeDefs],
  resolvers: [userResolvers]
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then((result: any) => {
    console.log(`🚀 Server ready at ${result.url}`);
  });
