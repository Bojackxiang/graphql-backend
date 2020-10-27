import DBUtils from "./Utils/DB/connection";
import Logger from "./Utils/Logger/logger";

export const contextGenerator = async () => {
    const db = await DBUtils.connection();
    const logger = new Logger();

    return { db, logger };
}

