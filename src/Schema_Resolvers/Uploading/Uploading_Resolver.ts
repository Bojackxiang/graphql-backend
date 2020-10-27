import { gql, IResolvers } from "apollo-server";

export const FILE_UPLOADING_SCHEMA = gql`
  type Test {
    test: String
  }

  type Query {
    getFile: Test
  }
`;

export const FILE_UPLOADING_RESOLVER: IResolvers<any, any> = {
  getFile: () => {
    return {
      test: "test",
    };
  },
};
