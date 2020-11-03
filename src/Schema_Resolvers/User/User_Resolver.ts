import { IResolvers } from "apollo-server";
import { getUserArgs, contextType } from "../../types/userResolverTypes";
import { gql } from "apollo-server";
import Response, { CONST_MESSAGE } from "../../Utils/Response/Response";
import {
  Type_Kids_Resolver,
  Type_Get_All_Users,
  Type_Create_User,
  Type_User_Sign_In,
} from "./types";
import JWT from "../../../src/Utils/JWT/JWT";
import { Redis_GET, Redis_SET } from "../../../src/Utils/Redis/Redis";
import {
  encryptionCompare,
  encryptionPassword,
} from "../../../src/Utils/Encryption/Encryption";
import { KidsLoader } from "./dataloader";

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

export const USER_RESOLVER: IResolvers<any, any> = {
  User: {
    Kids: async ({ _id }: Type_Kids_Resolver, _, { db }: contextType) => {
      // KidsLoader([_id])
      // return await db
      //   ?.collection("users")
      //   .find({
      //     role: "KID",
      //     parentId: _id.toHexString(),
      //   })
      //   .toArray();
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
        // 创建唯一的数据
        await db.collection("users").createIndex({ name: 1 }, { unique: true });
        const result = await db.collection("users").insertOne({
          ...args.createUserInput,
          password: await encryptionPassword(args.createUserInput.password),
        });

        return Response.serverResponse({
          success: true,
          message: CONST_MESSAGE.CREATE_USER_SUCCESSFULLY,
          mongo_id: result.insertedId,
        });
      } catch (error) {
        console.log(error);
        logger.writeError(error);
        return Response.serverResponse({
          success: true,
          message: error.message,
        });
      }
    },

    userSignIn: async (
      _,
      { username, email, password }: Type_User_Sign_In,
      { db, redisClient, request }: contextType
    ) => {
      try {
        // 缺少需要的信息
        if (!email || !password) throw new Error(CONST_MESSAGE.INCOMPLETE_INFO);

        // 链接 redis
        redisClient.on("error", (error) => {
          throw new Error(`${CONST_MESSAGE.REDIS_ERROR} ${error}`);
        });

        // redis 检查是否存在
        if (await Redis_GET(redisClient, email)) {
          // 检查token + 更新 token
          return Response.serverResponse({
            message: CONST_MESSAGE.LOGIN_SUCCESS,
            success: true,
          });
        }

        // 检查用户信息,却没有找到用户
        const user = await db.collection("users").findOne({ email, password });

        if (!user) {
          throw new Error(CONST_MESSAGE.NO_FOUND_USER);
        } else {
          // 用户已经正常额登陆了
          const isPwCorrect = await encryptionCompare(user.password, password);
          if (!isPwCorrect) {
            throw new Error(CONST_MESSAGE.WRONG_PASSWORD);
          }
          const token = JWT.generateJWT(username, password);
          await Redis_SET(redisClient, username, token);
          return Response.serverResponse({
            message: CONST_MESSAGE.LOGIN_SUCCESS,
            success: true,
            token: token,
          });
        }
      } catch (error) {
        return Response.serverResponse({
          message: error.message,
          success: false,
        });
      }
    },
  },
};
