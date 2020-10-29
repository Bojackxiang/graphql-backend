import DBUtils from "./Utils/DB/connection";
import Logger from "./Utils/Logger/logger";
import Redis from 'redis';



export const contextGenerator = async () => {
    const db = await DBUtils.connection();
    const logger = new Logger();
    const redisClient = Redis.createClient();

    return { db, logger, redisClient, };
}

