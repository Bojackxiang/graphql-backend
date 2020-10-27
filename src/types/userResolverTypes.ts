import Logger from "../Utils/Logger/logger";
import { Db } from "mongodb";


// query.getUser
export type contextType = {db: Db, logger: Logger}
export type getUserArgs = {username: string}
