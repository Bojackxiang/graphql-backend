import { gql, IResolvers } from "apollo-server";
import { contextType } from "src/types/userResolverTypes";
import Response from "../../Utils/Response/Response";
import { _cleanSearchQuery } from "./utils";

export const SEARCH_SCHEMA = gql`
  scalar JSObject

  input SearchInputsType {
    stateInShort: String
    city: [String]
    suburb: [String]
    code: [String]
  }

  extend type Query {
    search(searchInputs: SearchInputsType): Response
  }
`;

type searchInputsType = {
  searchInputs: {
    stateInShort: string;
    city: [string];
    suburb: [string];
    code: [string];
  };
};

export const SEARCH_RESOLVER: IResolvers<any, any> = {
  Query: {
    search: async (_, args: searchInputsType, { db }: contextType) => {
      // 这边要根据传进来的数据进行处理
      // 如果没有传进来，后面就不能有 in 中
      const query = args.searchInputs;

      const cleanedQuery = _cleanSearchQuery(query);
      console.log("cleanedQuery: ", cleanedQuery);

      const result = await db
        .collection("renting_properties")
        .find(cleanedQuery)
        .toArray();

      return Response.serverResponse({
        success: true,
        message: "success",
        payload: result,
      });
    },
  },
};
