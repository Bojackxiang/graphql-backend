import { gql, IResolvers } from "apollo-server";
import { RENTING_PROPERTIES } from "../../Constants/collections_name";
import { contextType } from "src/types/userResolverTypes";
import Response from "../../Utils/Response/Response";
import { searchInputsType } from "./types";
import { _cleanSearchQuery } from "./utils";

export const SEARCH_SCHEMA = gql`
  scalar JSObject

  input SearchInputsType {
    stateInShort: String
    city: [String]
    suburb: [String]
    code: [String]
    page: Int
    size: Int
  }

  extend type Query {
    search(searchInputs: SearchInputsType): Response
  }
`;

export const SEARCH_RESOLVER: IResolvers<any, any> = {
  Query: {
    search: async (_, args: searchInputsType, { db }: contextType) => {
      const { page, size, ...query } = args.searchInputs;
      const cleanedQuery = _cleanSearchQuery(query);
      const result = await db
        .collection(RENTING_PROPERTIES)
        .find(cleanedQuery)
        .skip(page * size)
        .limit(size)
        .toArray();

      return Response.serverResponse({
        success: true,
        message: "success",
        payload: result,
      });
    },
  },
};
