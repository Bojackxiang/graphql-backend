import { IResolvers } from "apollo-server";
import { getUserArgs, contextType } from "../../types/userResolverTypes";
import { gql } from "apollo-server";
import Response, { CONST_MESSAGE } from "../../Utils/Response/Response";
import { Type_Kids_Resolver, Type_Get_All_Users, Type_Create_User } from "./types";
import JWT from "../../../src/Utils/JWT/JWT";


export const USER_SCHEMAS = gql`
  enum Role {
    PARENT
    KID
  }

  input userInput {
    name: String
  }

  type User {
    _id: ID
    name: String
    role: Role
    Kids: [User]
    Parent: User
  }

  input GerUserInput {
    username: String!
  }

  input CreateUserInput {
    name: String
    password: String 
    email: String 
    Role: Role
  }

  input GetAllUserInput {
    parentId: ID
  }

  input UserSignInInput {
    username: String 
    email: String
    password: String
  }

  extend type Query {
    getUser(getUserInput: GerUserInput): User
    getUserByName(input: userInput): Response
    getAllUsers(getAllUserInput: GetAllUserInput): [User]
  }

  extend type Mutation {
    userCreate(createUserInput: CreateUserInput): Response
    userSignIn(userSignInInput: UserSignInInput): Response
  }
`;


type Type_User_Sign_In = {
  username: string
  email: string 
  password: string
}

export const USER_RESOLVER: IResolvers<any, any> = {
  User: {
    Kids: async ({ _id }: Type_Kids_Resolver, _, { db }: contextType) => {
      return await db
        ?.collection("users")
        .find({
          role: "KID",
          parentId: _id.toHexString(),
        })
        .toArray();
    },
  },

  Query: {
    getUser: async (_, args: getUserArgs, { db, logger }: contextType, __) => {
      // logger.writeError("this is an error");
      logger.writeTrace("this is a message");

      const foundUser = await db.collection("users").find().toArray();
      console.log(foundUser);
      return {
        name: "alex",
      };
    },

    getAllUsers: async (
      _,
      { parentId }: Type_Get_All_Users,
      { db }: contextType,
      __
    ) => {
      if (parentId) {
        //  进来的是个小孩
        const foundKids = await db
          .collection("users")
          .find({ parentId, role: "KID" })
          .toArray();
        return foundKids;
      }
      // const loadResult = await userLoader.load(["hello"]);
      return await db.collection("users").find({ role: "PARENT" }).toArray();

      // handling of the found result is an array
      // if (!Array.isArray(loadResult)) return [loadResult];
      // return loadResult;
    },
    getUserByName() {
      return {
        message: "test",
        success: true,
      };
    },
  },

  Mutation: {
    userCreate: async (
      _,
      args: Type_Create_User,
      { db, logger }: contextType,
      __
    ) => {
      try {
        const result = await db
          .collection("users")
          .insertOne(args.createUserInput);
        return Response.serverResponse({
          success: true,
          message: CONST_MESSAGE.CREATE_USER_SUCCESSFULLY,
          mongo_id: result.insertedId,
        });
      } catch (error) {
        logger.writeError(error);
        return Response.serverResponse({
          success: true,
          message: CONST_MESSAGE.CREATE_USER_FAILURE,
        });
      }
    },
    userSignIn: async (
      _,
      args: Type_User_Sign_In, 
      {db, }: contextType
    ) => {
      // const response = JWT.generateJWT("alex", "alex@gmail.com")
      // const verifiedResult = await JWT.verifyJWT(response, {username: "alex", email: "gmail"})

      // console.log({verifiedResult});

      return Response.serverResponse({message: "success", success: true})
    }
  },
};
