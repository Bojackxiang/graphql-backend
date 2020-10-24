import { IResolvers } from "apollo-server";
import { getUserArgs, getUserContext } from "./types/userResolverTypes";

export const userResolvers: IResolvers<any, any> = {
  Query: {
    getUser: async (parent, args: getUserArgs, ctx: getUserContext) => {
      console.log(parent, args);

      const foundUser = await ctx.db.collection("users").find().toArray();
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
