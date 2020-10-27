import { gql, IResolvers } from "apollo-server";
import { contextType } from "src/types/userResolverTypes";

export const FILE_UPLOADING_SCHEMA = gql`
  input FileInput {
    name: String
    file: FileInput
  }

  extend type Query {
    getFile(Id: String): Response
  }

  extend type Mutation {
    uploadPDFFile(FileInput: FileInput): Response
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
    uploadPDFFile: async (root, args: any, {db, logger}: contextType ) => {
      console.log(args);

      return {
        success: true, 
        message: ""
      }
    }
  }
};
