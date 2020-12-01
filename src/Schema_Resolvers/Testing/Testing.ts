import { gql, IResolvers } from "apollo-server";
import { MongoDataSource } from 'apollo-datasource-mongodb'
import { ObjectId } from "mongodb";



export const TESTING_SCHEMA = gql`
    type Test {
        message: String
    }

    extend type Query {
        Testing: Response
    }
`;

export const TESTING_RESOLVER: IResolvers<any, any> = {
  Query: {
    Testing: async (a, b, {dataSources: {users}}, d) => {

      const foundUser = await users.getUser('5fb1086f4b71ac0b6a86d422')
      console.log({foundUser});
      return {
          success: true
      }
    },
  },
};

export class Testing extends MongoDataSource<any, any> {

    async getUser(userId: string) {
      console.log('hello world');
      console.log(userId);
      const result = await this.collection.findOne({_id: new ObjectId(userId)})
      console.log(result);
      return 'should not be undefined'
    }
  }

