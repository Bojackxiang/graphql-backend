import { MongoClient } from "mongodb";

class DBUtils {
  static async connection() {
    try {
      const client = new MongoClient(process.env.DB_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      return client.db(process.env.DB_NAME);
    } catch (error) {
      console.log(" ❌ DB Connection error ");
      console.error(error);
      return null; 
    }
  }
}

export default DBUtils
