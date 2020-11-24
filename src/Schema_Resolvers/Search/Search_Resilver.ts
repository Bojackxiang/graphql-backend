import { gql, IResolvers } from "apollo-server";
import { contextType } from "src/types/userResolverTypes";
import Response from "../../Utils/Response/Response";

export const SEARCH_SCHEMA = gql`
  scalar JSObject

  input SearchInputs {
    name: String!
    upload: Upload!
    userId: String!
  }

  extend type Query {
    search(input: SearchInputs): Response
  }
`;

type searchInputType = {
  city: string;
  code: string;
  subarea: string;
};

export const SEARCH_RESOLVER: IResolvers<any, any> = {
  Query: {
    search: (_, args: searchInputType, {}: contextType) => {
      console.log(args);
      return Response.serverResponse({
        success: true,
        message: "success",
        payload: {
          result: {
            id: "12345",
          },
        },
      });
    },
  },
};
