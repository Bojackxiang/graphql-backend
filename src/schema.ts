
import {gql} from 'apollo-server'

export const typeDefs = gql`
    input userInput {
        name: String
    } 

    type User {
        name: String 
    }

    type Query {
        getUser: User
        getUserByName(input: userInput): User
    }
`;

