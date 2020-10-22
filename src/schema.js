const { gql } = require("apollo-server");

const typeDefs = gql`
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

module.exports = typeDefs;