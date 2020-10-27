import { IResolvers } from "apollo-server";
import { getUserArgs, getUserContext } from "../../types/userResolverTypes";
import { gql } from "apollo-server";

export const USER_SCHEMAS = gql`
  input userInput {
    name: String
  }

  type User {
    name: String
  }

  input GerUserInput {
    username: String!
  }

  type Query {
    getUser(getUserInput: GerUserInput): User
    getUserByName(input: userInput): Response
  }
`;

export const USER_RESOLVER: IResolvers<any, any> = {
  Query: {
    getUser: async (
      parent,
      args: getUserArgs,
      { db, logger }: getUserContext
    ) => {
      logger.writeError("this is an error");
      logger.writeTrace("this is a message");

      const foundUser = await db.collection("users").find().toArray();
      console.log(foundUser);
      return {
        name: "alex",
      };
    },
    getUserByName(parent, args: any) {
      return {
        message: "test",
        success: true,
      };
    },
  },
};
