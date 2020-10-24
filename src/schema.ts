
import {gql} from 'apollo-server'

export const typeDefs = gql`
    input userInput {
        name: String
    } 

    type User {
        name: String 
    }

    input GerUserInput {
        username: String!
    }

    type Query {
        getUser(getUserInput: GerUserInput): User
        getUserByName(input: userInput): User
    }
`;

