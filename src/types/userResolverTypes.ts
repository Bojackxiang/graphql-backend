import { Db } from "mongodb";


// query.getUser
export type getUserContext = {db: Db}
export type getUserArgs = {username: string}
