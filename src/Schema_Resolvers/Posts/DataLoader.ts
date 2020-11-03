import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { contextGenerator } from "src/context";

export const PostAuthorLoader = new DataLoader(
  async (ids: readonly ObjectId[]) => {
    // data loader 强制传进来的是一个 list
    const { db, logger } = await contextGenerator();
    if (!db) throw new Error("Cannot find the db");
    return await db
      ?.collection("users")
      .find({
        _id: {
          $in: ids,
        },
      })
      .toArray();
  }
);
