import { gql, IResolvers } from "apollo-server";
import { contextType } from "src/types/userResolverTypes";
import Response, { CONST_MESSAGE } from "../../Utils/Response/Response";

const sharedPostPiece = `
        title: String 
        author: ID 
        content: String 
        createDate: Date
        updateAt: Date
        test: Whatever
        address: String 
        State: State 
        City: String 
        Unit: String 
        Road: String
        Images: [String]
`;

export const POST_SCHEMA = gql`
    scalar Date
    scalar Whatever

    enum State {
        NSW 
        QLD 
        SA 
        TAS 
        VIC 
        WA
    }

    type Post {
        ${sharedPostPiece}
    }
  
  input PostGetInput {
    ${sharedPostPiece}
  }

  input PostsGetInput {
    name: String
  }
  
  input createNewPostInput {
    ${sharedPostPiece}
  }

  input updateExistingPostsInput {
    name: String
  }

  input updateExistingPostInput {
    name: String
  }

  input deletePostsInput {
    name: String
  }

  extend type Query {
    getPost(getPostInput: PostGetInput): Response
    getPosts(getPostsInput: PostsGetInput): Response
  }

  extend type Mutation {
    # 不剋多个操作
    createNewPost(createNewPostInput: createNewPostInput): Response
    # 不可以多个操作
    updateExistingPosts(updateExistingPosts: updateExistingPostInput): Response
    updateExistingPost(updateExistingPost: updateExistingPostInput): Response
    # 可以多个操作
    deletePosts(deletePostsInput: deletePostsInput): Response
  }
`;

export const POST_RESOLVER: IResolvers<any, any> = {
  Query: {
    getPosts: (_, args, {}: contextType) => {
      return {
        message: "success",
      };
    },
    getPost: (_, args: {}, {}: contextType) => {
      return {
        message: "success",
      };
    },
  },
  Mutation: {
    createNewPost: async (_, args, { db }: contextType) => {
      try {
        console.log({ args });
        const insertResult = await db
          .collection("posts")
          .insertOne(args.createNewPostInput);
        return Response.serverResponse({
          message: CONST_MESSAGE.CREATE_POST_SUCCESS,
          success: true,
          mongo_id: insertResult.insertedId,
        });
      } catch (error) {
        return Response.serverResponse({
          message: CONST_MESSAGE.CREATE_POST_FAIL,
          success: false,
        });
      }
    },
    updateExistingPosts: async (_, args, {}: contextType) => {},
    updateExistingPost: async (_, args, {}: contextType) => {},
    deletePosts: (_, args, {}: contextType) => {},
  },
};
