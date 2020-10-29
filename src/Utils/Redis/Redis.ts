import { RedisClient } from "redis";

export const Redis_GET = (client: RedisClient, key: string) => {
  return new Promise((resolve, reject) => {
    client.get(key, (error, value) => {
      resolve(value);
      reject(error);
    });
  });
};

export const Redis_SET = async (
  client: RedisClient,
  key: string,
  value: string
) => {
  await client.set(key, value);
};
