require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema"); // 定义了 上！
const resolvers = require("./resolvers");

const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/localtest", {
  useUnifiedTopology: true,
});
client.connect();

const server = new ApolloServer({
  context: async () => {
    const client = new MongoClient("mongodb://localhost:27017/localtest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const db = client.db("localtest")

    return { db };
  },
  typeDefs,
  resolvers,
});

server
  .listen({ port: process.env.PORT, path: process.env.PATH })
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
