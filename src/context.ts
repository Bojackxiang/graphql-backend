import DBUtils from "./Utils/DB/connection";
import Logger from "./Utils/Logger/logger";
import Redis from "redis";

export const contextGenerator = async () => {
  try {
    const db = await DBUtils.connection();
    const logger = new Logger();
    // TODO : 这个redis 链接应该有问题
    const redisClient = Redis.createClient();

    return { db, logger, redisClient };
  } catch (error) {
    return {};
  }
};
