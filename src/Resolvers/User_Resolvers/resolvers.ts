import { IResolvers } from "apollo-server";
import { logger } from "../../Logger/logger";
import { getUserArgs, getUserContext } from "../../types/userResolverTypes";


export const userResolvers: IResolvers<any, any> = {
  Query: {
    getUser: async (parent, args: getUserArgs, { db }: getUserContext) => {
      logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");

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
