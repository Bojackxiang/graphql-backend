import { ApolloServer } from "apollo-server";
import { MongoClient } from "mongodb";
import { contextGenerator } from "./context";
import { resolvers, schemas } from "./Schema_Resolvers";
import { Testing } from "./Schema_Resolvers/Testing/Testing";

// 用于链接 db
export const dbConnection = async () => {
  try {
    const dbClient = new MongoClient("mongodb://localhost:27017/localtest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return await dbClient.connect();
  } catch (error) {
    console.log("DB set up 失败");
    return null;
  }
};

// 用于启动 server
export const serverSetUp = async (client: any) => {
  try {
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

    return server;
  } catch (error) {
    throw new Error(`There is a server error ${error.message}`);
  }
};
