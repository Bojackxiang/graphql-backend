require("dotenv").config();

import { ApolloServer } from "apollo-server";

import { resolvers, schemas } from "./Schema_Resolvers";
import { contextGenerator } from "./context";
import { subscriber } from "./Utils/Queue/Receiver";
import { Testing } from "./Schema_Resolvers/Testing/Testing";
import { connect, MongoClient, Server } from "mongodb";
import { dbConnection, serverSetUp } from "./app";

const start = async () => {
  try {
    const client = await dbConnection();
    if (!client) throw new Error("db 链接有错");
    const server = await serverSetUp(client);
    if(!server) throw new Error("Server setup 失败")
    await server
      .listen({ port: process.env.PORT, path: process.env.PATH })
      .then((result: any) => {
        console.log(`🚀 Server ready at ${result.url}`);
      });
  } catch (error) {
    console.log('出错啦');
    console.log(error.message);
  }
};

start();
