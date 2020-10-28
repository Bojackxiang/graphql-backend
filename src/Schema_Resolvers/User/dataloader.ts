import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { contextGenerator } from "src/context";

// data loader 这边不合适，因为穿进去的id的长度和返回的id长度不一样
export const KidsLoader = new DataLoader(async (ids: readonly ObjectId[]) => {
    // data loader 强制传进来的是一个 list
    const { db, logger } = await contextGenerator();
    if (!db) throw new Error("Cannot find the db");
    const foundKids = await db
      ?.collection("users")
      .find({
        role: "KID",
        parentId: { $in: ids.map((id: ObjectId) => id.toHexString()) },
      })
      .toArray();
    console.log(foundKids);
    return foundKids;
  });