import Logger from "../Logger/logger";
import { Db } from "mongodb";


// query.getUser
export type getUserContext = {db: Db, logger: Logger}
export type getUserArgs = {username: string}
