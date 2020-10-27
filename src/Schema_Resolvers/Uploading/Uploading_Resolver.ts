import { gql, IResolvers } from "apollo-server";

export const FILE_UPLOADING_SCHEMA = gql`
  type Test {
    test: String
  }

  extend type Query {
    getFile: Test
  }

  
`;

export const FILE_UPLOADING_RESOLVER: IResolvers<any, any> = {
  Query: {
    getFile: () => {
      return {
        test: "test",
      };
    },
  },
};
