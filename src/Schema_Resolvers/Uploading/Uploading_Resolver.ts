import { gql, IResolvers } from "apollo-server";
import { contextType } from "src/types/userResolverTypes";

export const FILE_UPLOADING_SCHEMA = gql`
  input SingleFileUploadInput {
    name: String!
    upload: Upload!
    userId: String!
  }

  input MultiFileUploadInput {
    name: String!
    upload: [Upload!]!
    userId: String!
  }

  extend type Query {
    getFile(Id: String): Response
  }

  extend type Mutation {
    uploadingSingleFile(FileInput: SingleFileUploadInput): Response
    uploadingMultiFile(FileInput: SingleFileUploadInput): Response
  }
`;

export const FILE_UPLOADING_RESOLVER: IResolvers<any, any> = {
  Query: {
    getFile: () => {
      return {
        success: true,
      };
    },
  },
  Mutation: {
    uploadingSingleFile: async (
      root,
      args: any,
      { db, logger }: contextType
    ) => {
      return {
        success: true,
        message: "Upload single file successfully",
      };
    },
    uploadingMultiFile: async (
      root,
      args: any,
      { db, logger, request }: contextType
    ) => {
      return {
        success: true,
        message: "Upload multiple files successfully",
      };
    },
  },
};
