import { gql, IResolvers } from "apollo-server";

export const GENERAL_SCHEMA = gql`
  type Response {
    message: String
    success: Boolean
  }
  type Query {
    generalQuery: Response
  }

  type Mutation {
    generalMutation: Response
  }
`;

export const GENERAL_RESOLVER: IResolvers<any, any> = {
  Query: {
    generalQuery: () => {
      return {
        success: true,
      };
    },
  },

  Mutation: {
    generalMutation: () => {
      return {
        success: true,
      };
    },
  },
};
