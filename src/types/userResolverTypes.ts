import Logger from "../Utils/Logger/logger";
import { Db } from "mongodb";
import { RedisClient } from "redis";
import Request  from 'express';
import express from 'express';
// query.getUser
export type contextType = {
    db: Db, 
    logger: Logger, 
    redisClient: RedisClient,
    request: express.Request
}
export type getUserArgs = {username: string}
