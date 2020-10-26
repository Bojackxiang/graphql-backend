import { IResolvers } from "apollo-server";
import Logger from "../../Logger/logger";
import { getUserArgs, getUserContext } from "../../types/userResolverTypes";

export const userResolvers: IResolvers<any, any> = {
  Query: {
    getUser: async (parent, args: getUserArgs, { db, logger }: getUserContext) => {
      logger.writeError("this is an error");
      logger.writeTrace("this is a message");

      const foundUser = await db.collection("users").find().toArray();
      console.log(foundUser);
      return {
        name: "alex",
      };
    },

    // getUserByName: async ( , b, {db}, d ) => {
    //   const foundResult = await db.collection('users').find().toArray();
    //   console.log(foundResult);
    //   return {
    //     name: "alex",
    //   };
    // },
  },
};
