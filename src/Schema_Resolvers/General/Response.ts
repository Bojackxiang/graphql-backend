import {gql} from 'apollo-server'

export const RESPONSE_SCHEMA = gql`
    type Response {
        message: String
        success: Boolean 
    }
`